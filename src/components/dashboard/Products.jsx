import React, { useState, useEffect, useRef } from "react";
import supabase from "../../config/supabaseClient";
import Button from "../ui/Button";

export default function Products({ user }) {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    image_url: "",
    collection_id: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    fetchCollections();

    // Set up realtime subscription for products
    const productSubscription = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        (payload) => {
          console.log("Product change received!", payload);
          fetchProducts();
        },
      )
      .subscribe();

    // Set up realtime subscription for collections
    const collectionSubscription = supabase
      .channel("collections-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collections",
        },
        (payload) => {
          console.log("Collection change received!", payload);
          fetchCollections();
        },
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(productSubscription);
      supabase.removeChannel(collectionSubscription);
    };
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      let query = supabase
        .from("products")
        .select("*, collections(collection_name)")
        .order("created_at", { ascending: false });

      // Filter by user_id if user is available
      if (user?.id) {
        query = query.eq("user_id", user.id);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  async function fetchCollections() {
    try {
      const { data, error } = await supabase
        .from("collections")
        .select("id, collection_name")
        .order("collection_name", { ascending: true });

      if (error) throw error;
      setCollections(data || []);

      // If there are collections and no collection is selected, select the first one
      if (data && data.length > 0 && !formData.collection_id) {
        setFormData((prev) => ({ ...prev, collection_id: data[0].id }));
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
      setError("Failed to fetch collections");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const clearImageSelection = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.collection_id) {
      setError("Please select a collection");
      return;
    }

    try {
      setLoading(true);
      let finalImageUrl = formData.image_url;

      // Handle image upload if there's a new image file
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `products/${formData.collection_id}/${fileName}`;

        // Upload the image to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
            onUploadProgress: (progress) => {
              setUploadProgress(
                Math.round((progress.loaded / progress.total) * 100),
              );
            },
          });

        if (uploadError) throw uploadError;

        // Get the public URL for the uploaded image
        const {
          data: { publicUrl },
        } = supabase.storage.from("products").getPublicUrl(filePath);

        finalImageUrl = publicUrl;
      }

      const productData = {
        ...formData,
        image_url: finalImageUrl,
      };

      if (editingId) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update({ ...productData, user_id: user?.id })
          .eq("id", editingId);

        if (error) throw error;
      } else {
        // Add new product
        const { error } = await supabase
          .from("products")
          .insert([{ ...productData, user_id: user?.id }]);

        if (error) throw error;
      }

      // Reset form but keep the selected collection
      const selectedCollection = formData.collection_id;
      setFormData({
        product_name: "",
        description: "",
        image_url: "",
        collection_id: selectedCollection,
      });
      setEditingId(null);
      setImageFile(null);
      setImagePreview(null);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      setError(`Failed to save product: ${error.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      product_name: product.product_name,
      description: product.description || "",
      image_url: product.image_url || "",
      collection_id: product.collection_id,
    });

    // Set image preview if there's an existing image
    if (product.image_url) {
      setImagePreview(product.image_url);
    } else {
      setImagePreview(null);
    }
    setImageFile(null);
    setUploadProgress(0);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      setLoading(true);
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      product_name: "",
      description: "",
      image_url: "",
      collection_id: formData.collection_id, // Keep the selected collection
    });
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6 bg-white/5 rounded-lg border border-gold/20">
      <h2 className="text-2xl font-serif text-gold mb-4">
        {editingId ? "Edit Product" : "Add New Product"}
      </h2>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gold mb-2" htmlFor="collection_id">
            Collection
          </label>
          <select
            id="collection_id"
            name="collection_id"
            value={formData.collection_id}
            onChange={handleInputChange}
            required
            className="w-full bg-white/10 border border-gold/30 rounded px-3 py-2 text-gold"
          >
            <option value="">Select a collection</option>
            {collections.map((collection) => (
              <option key={collection.id} value={collection.id}>
                {collection.collection_name}
              </option>
            ))}
          </select>
          {collections.length === 0 && (
            <p className="text-gold/70 mt-2 text-sm">
              No collections available. Please create a collection first.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gold mb-2" htmlFor="product_name">
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleInputChange}
            required
            className="w-full bg-white/10 border border-gold/30 rounded px-3 py-2 text-gold"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-gold/30 rounded px-3 py-2 text-gold"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gold mb-2" htmlFor="image">
            Product Image
          </label>
          <div className="space-y-4">
            {imagePreview && (
              <div className="relative w-full max-w-xs">
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="w-full h-auto rounded border border-gold/30"
                />
                <button
                  type="button"
                  onClick={clearImageSelection}
                  className="absolute top-2 right-2 bg-burgundy/80 text-red-400 rounded-full p-1 hover:bg-burgundy"
                >
                  ✕
                </button>
              </div>
            )}

            <input
              type="file"
              id="image"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="w-full bg-white/10 border border-gold/30 rounded px-3 py-2 text-gold"
            />

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="w-full bg-white/10 rounded-full h-2.5">
                <div
                  className="bg-gold h-2.5 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
                <p className="text-xs text-gold mt-1">
                  {uploadProgress}% uploaded
                </p>
              </div>
            )}

            <div className="text-sm text-gold/70">
              <p>Or provide an image URL:</p>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-gold/30 rounded px-3 py-2 text-gold mt-1"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="px-4 py-2">
            {editingId ? "Update" : "Add Product"}
          </Button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="border-2 border-gold/50 text-gold/50 px-4 py-2 hover:bg-gold/10 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-serif text-gold mb-4">Your Products</h3>

      {loading && !editingId ? (
        <div className="text-gold/70">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-gold/70">
          No products yet. Add your first one above!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 rounded-lg overflow-hidden border border-gold/20"
            >
              {product.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-4">
                <span className="text-xs text-gold/60 block mb-1">
                  {product.collections?.collection_name}
                </span>
                <h4 className="font-serif text-xl text-gold mb-2">
                  {product.product_name}
                </h4>
                <p className="text-gold/80 mb-4">{product.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-sm text-gold/80 hover:text-gold border border-gold/30 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-sm text-red-400 hover:text-red-300 border border-red-400/30 px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}