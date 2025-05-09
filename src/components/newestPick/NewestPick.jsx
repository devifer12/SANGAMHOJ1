import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";

export default function NewestPick() {
  const navigate = useNavigate();
  const [newestProducts, setNewestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  async function fetchNewestPicks() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("newest_picks")
        .select("*, products(*, collections(collection_name))")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      // Extract the product data from the nested structure
      const products = data?.map((pick) => pick.products).filter(Boolean) || [];
      setNewestProducts(products);
    } catch (error) {
      console.error("Error fetching newest picks:", error);
      setError("Failed to fetch newest picks");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="collections" className="bg-white pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-20">
          THE NEWEST PICKS
        </h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="md:w-1/4">
            <div className="text-left">
              <h3 className="font-serif text-3xl text-jewel-green mb-6">
                FEATURED
                <br />
                PRODUCTS
              </h3>
              <p className="text-gray-600 mb-8">
                "Explore our curated selection of featured products, where
                exceptional craftsmanship meets timeless elegance. Handpicked to
                showcase the finest in design and quality, these pieces are
                perfect for every occasion."
              </p>
              <div className="hidden md:block">
                <button
                  onClick={() => navigate("/collection")}
                  className="border border-burgundy text-black px-8 py-3 rounded-full hover:bg-burgundy hover:text-gold transition-colors"
                >
                  EXPLORE NOW
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {loading ? (
              // Loading state
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={`loading-${index}`}
                    className="aspect-square rounded-lg overflow-hidden mb-4 bg-white shadow-lg"
                  >
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400">Loading...</span>
                    </div>
                  </div>
                ))
            ) : newestProducts.length > 0 ? (
              // Display actual products
              newestProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">
                          {product.product_name}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif text-xl text-jewel-green text-center">
                    {product.product_name}
                  </h3>
                  {product.collections && (
                    <p className="text-gray-500 text-center text-sm">
                      {product.collections.collection_name}
                    </p>
                  )}
                </div>
              ))
            ) : (
              // Message for no products
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">
                  No featured products selected yet.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Visit the dashboard to select your newest picks.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden text-center mt-12">
          <button
            onClick={() => navigate("/collection")}
            className="border border-burgundy text-black px-8 py-3 rounded-full hover:bg-burgundy hover:text-gold transition-colors"
          >
            EXPLORE NOW
          </button>
        </div>
      </div>
    </div>
  );
}