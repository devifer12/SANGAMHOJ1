import React, { useEffect, useState } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";
import supabase from "../config/supabaseClient";

export default function Collection() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCollections();

    // Set up realtime subscription
    const subscription = supabase
      .channel("collections-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collections",
        },
        (payload) => {
          console.log("Change received!", payload);
          fetchCollections();
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
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
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setError("Failed to fetch collections");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-16">
            Our Collection
          </h1>

          {error && (
            <div className="text-center text-red-400 mb-8">{error}</div>
          )}

          {loading ? (
            <div className="text-center text-gold">
              <p>Loading collections...</p>
            </div>
          ) : collections.length === 0 ? (
            <div className="text-center text-gold">
              <p>No collections available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 rounded-lg overflow-hidden"
                >
                  {item.image_url && (
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-gold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-gold/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}