import React, { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";
import Button from "../ui/Button";

export default function NewestPick({ user }) {
  const [products, setProducts] = useState([]);
  const [newestPicks, setNewestPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MAX_PICKS = 3;

  useEffect(() => {
    fetchProducts();
    fetchNewestPicks();

    // Set up realtime subscription for newest_picks
    const newestPicksSubscription = supabase
      .channel("newest-picks-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "newest_picks",
        },
        (payload) => {
          console.log("Newest picks change received!", payload);
          fetchNewestPicks();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(newestPicksSubscription);
    };
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*, collections(collection_name)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  async function fetchNewestPicks() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("newest_picks")
        .select("*, products(*, collections(collection_name))")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNewestPicks(data || []);
    } catch (error) {
      console.error("Error fetching newest picks:", error);
      setError("Failed to fetch newest picks");
    } finally {
      setLoading(false);
    }
  }

  const isProductInNewestPicks = (productId) => {
    return newestPicks.some((pick) => pick.product_id === productId);
  };

  const handleToggleNewestPick = async (productId) => {
    try {
      setError(null);
      const isAlreadyPick = isProductInNewestPicks(productId);

      if (isAlreadyPick) {
        // Remove from newest picks
        const pickToRemove = newestPicks.find(
          (pick) => pick.product_id === productId,
        );
        if (pickToRemove) {
          const { error } = await supabase
            .from("newest_picks")
            .delete()
            .eq("id", pickToRemove.id);

          if (error) throw error;
        }
      } else {
        // Check if we already have MAX_PICKS
        if (newestPicks.length >= MAX_PICKS) {
          setError(
            `You can only select up to ${MAX_PICKS} products as newest picks. Please remove one first.`,
          );
          return;
        }

        // Add to newest picks
        const { error } = await supabase.from("newest_picks").insert([
          {
            product_id: productId,
            user_id: user?.id || null,
          },
        ]);

        if (error) throw error;
      }

      // Refresh the newest picks list
      fetchNewestPicks();
    } catch (error) {
      console.error("Error updating newest picks:", error);
      setError(`Failed to update newest picks: ${error.message}`);
    }
  };

  return (
    <div className="p-6 bg-white/5 rounded-lg border border-gold/20">
      <h2 className="text-2xl font-serif text-gold mb-4">Newest Picks</h2>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <p className="text-gold/80 mb-6">
        Select products to feature in the "Newest Picks" section on your home
        page. You can select up to {MAX_PICKS} products.
      </p>

      <div className="mb-8">
        <h3 className="text-xl font-serif text-gold mb-4">
          Current Newest Picks ({newestPicks.length}/{MAX_PICKS})
        </h3>

        {loading && newestPicks.length === 0 ? (
          <div className="text-gold/70">Loading newest picks...</div>
        ) : newestPicks.length === 0 ? (
          <div className="text-gold/70">
            No newest pick products are there. Select some below!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {newestPicks.map((pick) => (
              <div
                key={pick.id}
                className="bg-white/10 rounded-lg overflow-hidden border border-gold/20"
              >
                {pick.products?.image_url && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={pick.products.image_url}
                      alt={pick.products.product_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <span className="text-xs text-gold/60 block mb-1">
                    {pick.products?.collections?.collection_name}
                  </span>
                  <h4 className="font-serif text-xl text-gold mb-2">
                    {pick.products?.product_name}
                  </h4>
                  <p className="text-gold/80 mb-4">
                    {pick.products?.description}
                  </p>
                  <Button
                    onClick={() => handleToggleNewestPick(pick.product_id)}
                    className="text-sm px-3 py-1"
                  >
                    Remove from Newest Picks
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-xl font-serif text-gold mb-4">Your Products</h3>

        {loading && products.length === 0 ? (
          <div className="text-gold/70">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-gold/70">
            No products available. Add products first!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className={`bg-white/10 rounded-lg overflow-hidden border ${isProductInNewestPicks(product.id) ? "border-gold" : "border-gold/20"}`}
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
                  <p className="text-gold/80 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`pick-${product.id}`}
                      checked={isProductInNewestPicks(product.id)}
                      onChange={() => handleToggleNewestPick(product.id)}
                      className="mr-2 h-5 w-5 text-gold focus:ring-gold border-gold/50 rounded"
                    />
                    <label
                      htmlFor={`pick-${product.id}`}
                      className="text-gold cursor-pointer"
                    >
                      {isProductInNewestPicks(product.id)
                        ? "Selected as Newest Pick"
                        : "Select as Newest Pick"}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}