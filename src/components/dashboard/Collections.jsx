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

    // Set up realtime subscription for category updates (since categories are our collections)
    const subscription = supabase
      .channel("categories-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "categories" },
        fetchCollections,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchCollections() {
    try {
      // Fetch categories as collections
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("title", { ascending: true });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(id) {
    // Navigate to edit category page
    navigate(`/dashboard/edit-product/${id}`);
  }

  if (loading) return <div className="text-gold">Loading collections...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  if (collections.length === 0) {
    return (
      <div className="text-center text-gold py-8">
        <p className="mb-4">No collections found.</p>
        <p>Add collections in the Products section.</p>
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
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h3 className="text-xl font-serif text-gold mb-2">
              {collection.title}
            </h3>
            <div className="flex justify-between items-center">
              <button
                onClick={() =>
                  navigate(`/dashboard/products?category=${collection.id}`)
                }
                className="text-gold hover:text-gold/80"
              >
                View Products
              </button>
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
