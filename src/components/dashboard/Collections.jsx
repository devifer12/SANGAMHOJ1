import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function Collections() {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollections();

    // Set up realtime subscription for collection updates
    const subscription = supabase
      .channel("collections-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "collections" },
        fetchCollections,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchCollections() {
    try {
      const { data, error } = await supabase
        .from("collections")
        .select("*, categories(title)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(id) {
    navigate(`/dashboard/edit-collection/${id}`);
  }

  if (loading) return <div className="text-gold">Loading collections...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  if (collections.length === 0) {
    return (
      <div className="text-center text-gold py-8">
        <p className="mb-4">No collections found.</p>
        <p>Collections are automatically created when you add categories.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif text-gold">Manage Collections</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="bg-white/5 rounded-lg p-6 border border-gold/20"
          >
            <div className="aspect-square mb-4">
              <img
                src={collection.image_url}
                alt={collection.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h3 className="text-xl font-serif text-gold mb-2">
              {collection.name}
            </h3>
            <p className="text-gold/80 mb-4">{collection.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-gold/60 text-sm">
                Category: {collection.categories?.title || "None"}
              </span>
              <button
                onClick={() => handleEdit(collection.id)}
                className="text-gold hover:text-gold/80"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
