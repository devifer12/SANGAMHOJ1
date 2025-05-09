import React, { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";

export default function Overview({ user }) {
  const [collectionsCount, setCollectionsCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCounts();
  }, []);

  async function fetchCounts() {
    try {
      setLoading(true);
      setError(null);

      // Fetch collections count
      const { count: collectionsCount, error: collectionsError } =
        await supabase
          .from("collections")
          .select("*", { count: "exact", head: true });

      if (collectionsError) throw collectionsError;

      // Fetch products count
      const { count: productsCount, error: productsError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      if (productsError) throw productsError;

      setCollectionsCount(collectionsCount || 0);
      setProductsCount(productsCount || 0);
    } catch (error) {
      console.error("Error fetching counts:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-white/5 rounded-lg border border-gold/20">
      <h2 className="text-2xl font-serif text-gold mb-6">Dashboard Overview</h2>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Collections Card */}
        <div className="p-6 bg-white/10 rounded-lg border border-gold/30">
          <h3 className="text-xl font-serif text-gold mb-2">Collections</h3>
          {loading ? (
            <div className="text-gold/70">Loading...</div>
          ) : (
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-gold">
                {collectionsCount}
              </span>
              <span className="text-gold/80 mb-1">total</span>
            </div>
          )}
        </div>

        {/* Products Card */}
        <div className="p-6 bg-white/10 rounded-lg border border-gold/30">
          <h3 className="text-xl font-serif text-gold mb-2">Products</h3>
          {loading ? (
            <div className="text-gold/70">Loading...</div>
          ) : (
            <div className="flex items-end gap-2">
              <span className="text-4xl font-bold text-gold">
                {productsCount}
              </span>
              <span className="text-gold/80 mb-1">total</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gold/80">
          Welcome to your dashboard. Here you can manage your collections,
          products, and featured items.
        </p>
      </div>
    </div>
  );
}
