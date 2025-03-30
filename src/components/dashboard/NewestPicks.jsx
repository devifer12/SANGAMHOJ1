import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function NewestPicks() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();

    // Set up realtime subscription for product updates
    const subscription = supabase
      .channel("newest-picks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
          filter: "is_newest_pick=eq.true",
        },
        fetchProducts,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_newest_pick", true)
        .order("display_order", { ascending: true })
        .limit(10);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (
      !window.confirm(
        "Are you sure you want to delete this product from newest picks?",
      )
    )
      return;

    try {
      // Instead of deleting, we just update the is_newest_pick flag to false
      const { error } = await supabase
        .from("products")
        .update({ is_newest_pick: false })
        .eq("id", id);

      if (error) throw error;
      // The UI will update automatically via the realtime subscription
    } catch (error) {
      console.error("Error removing product from newest picks:", error);
      alert(`Error: ${error.message}`);
    }
  }

  if (loading) return <div className="text-gold">Loading products...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  if (products.length === 0) {
    return (
      <div className="text-center text-gold py-8">
        <p className="mb-4">No products found in newest picks.</p>
        <button
          onClick={() => navigate("/dashboard/add-product")}
          className="inline-block bg-gold text-burgundy px-4 py-2 rounded hover:bg-gold/90 transition-colors"
        >
          Add your first product
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif text-gold">Manage Newest Picks</h2>
        <button
          onClick={() => navigate("/dashboard/select-newest-picks")}
          className="bg-gold text-burgundy px-4 py-2 rounded hover:bg-gold/90 transition-colors"
        >
          Select Products
        </button>
      </div>

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
            <p className="text-gold/80 mb-4">{product.description}</p>
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
                onClick={() => handleDelete(product.id)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}