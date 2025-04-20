import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function ExploreCategory() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollections();

    // Set up realtime subscription
    const subscription = supabase
      .channel("explore-category-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collections",
        },
        fetchCollections
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchCollections() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .order("id", { ascending: true })
        .limit(3);

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setError("Failed to fetch collections");
    } finally {
      setLoading(false);
    }
  }

  // If there are no collections, don't render anything
  if (collections.length === 0 && !loading) {
    return null;
  }

  return (
    <div className="bg-white pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-16">
          EXPLORE CATEGORIES
        </h2>

        {error && (
          <div className="text-center text-red-400 mb-8">{error}</div>
        )}

        {loading ? (
          <div className="text-center text-gray-600 mb-8">
            <p>Loading collections...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => navigate("/collection")}
              >
                {item.image_url && (
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={400}
                      height={400}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-jewel-green mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <button
                    className="border border-burgundy text-black px-6 py-2 rounded-full hover:bg-burgundy hover:text-gold transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/collection");
                    }}
                  >
                    EXPLORE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/collection")}
            className="border border-burgundy text-black px-8 py-3 rounded-full hover:bg-burgundy hover:text-gold transition-colors"
          >
            VIEW ALL COLLECTIONS
          </button>
        </div>
      </div>
    </div>
  );
}
