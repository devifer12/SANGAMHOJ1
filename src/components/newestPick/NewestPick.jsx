import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function NewestPick() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewestPicks();

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
        fetchNewestPicks
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchNewestPicks() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_newest_pick", true)
        .order("display_order", { ascending: true })
        .limit(10);

      if (error) throw error;

      if (data) {
        setCollections(data);
      }
    } catch (error) {
      console.error("Error fetching newest picks:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const getSimilarItems = (currentItem) => {
    return collections
      .filter(
        (item) =>
          item.type === currentItem.type && item.name !== currentItem.name
      )
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div id="collections" className="bg-white pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-20">
            THE NEWEST PICKS
          </h2>
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div id="collections" className="bg-white pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-20">
            THE NEWEST PICKS
          </h2>
          <div className="text-center text-red-600">Error: {error}</div>
        </div>
      </div>
    );
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
                showcase the finest in design and quality, these pieces are perfect
                for every occasion."
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
            {collections.map((collection) => (
              <div
                key={collection.id}
                className="group cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setSelectedItem(collection)}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={collection.image_url}
                    alt={collection.name}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                </div>
                <h3 className="font-serif text-xl text-jewel-green text-center">
                  {collection.name}
                </h3>
              </div>
            ))}
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

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-burgundy rounded-lg w-full max-w-7xl max-h-screen overflow-y-auto">
            <div className="flex flex-col md:flex-row">
              {/* Main Image Section (70% width) */}
              <div className="md:w-[45%] p-8">
                <div className="relative">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute -top-4 -right-4 bg-gold text-burgundy w-8 h-8 rounded-full flex items-center justify-center hover:bg-gold/80"
                  >
                    ×
                  </button>
                  <img
                    src={selectedItem.image_url}
                    alt={selectedItem.name}
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="mt-6">
                    <h2 className="font-serif text-3xl text-gold mb-3">
                      {selectedItem.name}
                    </h2>
                    <p className="text-gold/80 mb-3">
                      {selectedItem.description}
                    </p>
                    <span className="text-sm text-gold/60">
                      {selectedItem.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Similar Items Section (30% width) */}
              <div className="md:w-[30%] p-8 border-t md:border-l md:border-t-0 border-gold/20">
                <h3 className="font-serif text-xl text-gold mb-6">
                  Similar Items
                </h3>
                <div className="space-y-6">
                  {getSimilarItems(selectedItem).map((item) => (
                    <div
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-3">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="font-serif text-gold">{item.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}