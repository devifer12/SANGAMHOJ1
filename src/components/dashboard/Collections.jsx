import React, { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";
import Button from "../ui/Button";

export default function Collections({ user }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    collection_name: "",
  });

  useEffect(() => {
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
        },
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null); // Clear any previous errors

      if (editingId) {
        // Update existing collection
        const { error } = await supabase
          .from("collections")
          .update(formData)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        // Add new collection
        const { data, error } = await supabase
          .from("collections")
          .insert([{ ...formData, user_id: user?.id }])
          .select();

        if (error) throw error;
        console.log("Collection created successfully:", data);
      }

      // Reset form
      setFormData({ collection_name: "" });
      setEditingId(null);
      fetchCollections();
    } catch (error) {
      console.error("Error saving collection:", error);
      setError(
        `Failed to save collection: ${error.message || "Unknown error"}`,
      ); // More detailed error message
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (collection) => {
    setEditingId(collection.id);
    setFormData({
      collection_name: collection.collection_name,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collection?"))
      return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("collections")
        .delete()
        .eq("id", id);

      if (error) throw error;
      fetchCollections();
    } catch (error) {
      console.error("Error deleting collection:", error);
      setError("Failed to delete collection");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ collection_name: "" });
  };

  return (
    <div className="p-6 bg-white/5 rounded-lg border border-gold/20">
      <h2 className="text-2xl font-serif text-gold mb-4">
        {editingId ? "Edit Collection" : "Add New Collection"}
      </h2>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-gold mb-2" htmlFor="collection_name">
            Collection Name
          </label>
          <input
            type="text"
            id="collection_name"
            name="collection_name"
            value={formData.collection_name}
            onChange={handleInputChange}
            required
            className="w-full bg-white/10 border border-gold/30 rounded px-3 py-2 text-gold"
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="px-4 py-2">
            {editingId ? "Update" : "Add Collection"}
          </Button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="border-2 border-gold/50 text-gold/50 px-4 py-2 hover:bg-gold/10 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-serif text-gold mb-4">Your Collections</h3>

      {loading && !editingId ? (
        <div className="text-gold/70">Loading collections...</div>
      ) : collections.length === 0 ? (
        <div className="text-gold/70">
          No collections yet. Add your first one above!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white/10 rounded-lg overflow-hidden border border-gold/20 p-4"
            >
              <h4 className="font-serif text-xl text-gold mb-4">
                {collection.collection_name}
              </h4>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(collection)}
                  className="text-sm text-gold/80 hover:text-gold border border-gold/30 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(collection.id)}
                  className="text-sm text-red-400 hover:text-red-300 border border-red-400/30 px-3 py-1 rounded"
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