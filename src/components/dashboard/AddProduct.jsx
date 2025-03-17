import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image_url: "",
    type: "",
    category_id: "",
    is_newest_pick: false
  });

  useEffect(() => {
    // Fetch categories for the dropdown
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("title", { ascending: true });

        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      // Upload to Supabase storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("SITE IMAGES")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage
        .from("SITE IMAGES")
        .getPublicUrl(filePath);

      setProduct({ ...product, image_url: data.publicUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(`Error uploading image: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.image_url || !product.category_id) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      // Get the category type to use as product type
      const category = categories.find(cat => cat.id === product.category_id);
      const productType = category ? category.title : product.type;

      // Insert the product
      const { data, error } = await supabase
        .from("products")
        .insert({
          ...product,
          type: productType
        })
        .select();

      if (error) throw error;

      alert("Product added successfully!");
      navigate("/dashboard/newest-picks");
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`Error adding product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-serif text-gold mb-8">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gold mb-2">Product Name *</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
              placeholder="Product Name"
              required
            />
          </div>

          <div>
            <label className="block text-gold mb-2">Category *</label>
            <select
              name="category_id"
              value={product.category_id}
              onChange={handleChange}
              className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gold mb-2">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
              placeholder="Product Description"
              rows="4"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-gold mb-2">Product Image *</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-gold"
              />
              {product.image_url && (
                <div className="w-24 h-24 rounded overflow-hidden">
                  <img
                    src={product.image_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_newest_pick"
              checked={product.is_newest_pick}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gold">Add to Newest Picks</label>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/newest-picks")}
            className="px-4 py-2 text-gold hover:text-gold/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-gold text-burgundy px-6 py-2 rounded hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
