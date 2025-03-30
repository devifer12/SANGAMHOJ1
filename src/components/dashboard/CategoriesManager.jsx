import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function ProductsManager() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get category from URL query params if available
    const params = new URLSearchParams(location.search);
    const categoryId = params.get("category");

    // Fetch categories first
    fetchCategories(categoryId);

    // Set up realtime subscription for product updates
    const subscription = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => fetchProducts(selectedCategory?.id),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [location.search]);

  // Fetch products whenever selected category changes
  useEffect(() => {
    if (selectedCategory) {
      fetchProducts(selectedCategory.id);
    }
  }, [selectedCategory]);

  async function fetchCategories(initialCategoryId = null) {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("title", { ascending: true });

      if (error) throw error;

      setCategories(data || []);

      // Set initial selected category
      if (data && data.length > 0) {
        if (initialCategoryId) {
          const category = data.find((cat) => cat.id === initialCategoryId);
          setSelectedCategory(category || data[0]);
        } else {
          setSelectedCategory(data[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message);
    }
  }

  async function fetchProducts(categoryId) {
    if (!categoryId) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryId)
        .order("name", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      // Refresh the products list
      fetchProducts(selectedCategory.id);
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(`Error deleting product: ${error.message}`);
    }
  };

  if (loading && !selectedCategory)
    return <div className="text-gold">Loading categories...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif text-gold">Manage Products</h2>
        <button
          onClick={() => navigate("/dashboard/add-product")}
          className="bg-gold text-burgundy px-4 py-2 rounded hover:bg-gold/90 transition-colors"
        >
          Add New Product
        </button>
      </div>

      {/* Category selector */}
      <div className="mb-8">
        <label className="block text-gold mb-2">Select Collection</label>
        <select
          value={selectedCategory?.id || ""}
          onChange={(e) => {
            const categoryId = e.target.value;
            const category = categories.find((c) => c.id === categoryId);
            setSelectedCategory(category);
          }}
          className="w-full md:w-1/3 bg-white/10 border border-gold/30 rounded p-2 text-gold"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-gold">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gold py-8">
          <p className="mb-4">No products found in this collection.</p>
          <button
            onClick={() => navigate("/dashboard/add-product")}
            className="bg-gold text-burgundy px-4 py-2 rounded hover:bg-gold/90 transition-colors"
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/5 rounded-lg p-6 border border-gold/20"
            >
              <div className="aspect-square mb-4">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <h3 className="text-xl font-serif text-gold mb-2">
                {product.name}
              </h3>
              <p className="text-gold/80 mb-4 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() =>
                    navigate(`/dashboard/edit-product/${product.id}`)
                  }
                  className="text-gold hover:text-gold/80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}