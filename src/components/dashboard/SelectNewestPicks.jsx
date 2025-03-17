import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function SelectNewestPicks() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [newestPicks, setNewestPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch all products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (productsError) throw productsError;

      // Fetch current newest picks
      const { data: newestData, error: newestError } = await supabase
        .from("products")
        .select("*")
        .eq("is_newest_pick", true)
        .order("created_at", { ascending: false });

      if (newestError) throw newestError;

      setAllProducts(productsData || []);
      setNewestPicks(newestData || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const toggleNewestPick = (product) => {
    // Check if product is already in newest picks
    const isAlreadyNewest = newestPicks.some((p) => p.id === product.id);

    if (isAlreadyNewest) {
      // Remove from newest picks
      setNewestPicks(newestPicks.filter((p) => p.id !== product.id));
    } else {
      // Add to newest picks if under limit
      if (newestPicks.length < 10) {
        setNewestPicks([...newestPicks, product]);
      } else {
        alert("You can only have up to 10 products in Newest Picks.");
      }
    }
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const newOrder = [...newestPicks];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setNewestPicks(newOrder);
  };

  const moveDown = (index) => {
    if (index === newestPicks.length - 1) return;
    const newOrder = [...newestPicks];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setNewestPicks(newOrder);
  };

  const saveChanges = async () => {
    try {
      setSaving(true);

      // First, reset all products to not be newest picks
      const { error: resetError } = await supabase
        .from("products")
        .update({ is_newest_pick: false })
        .neq("id", "00000000-0000-0000-0000-000000000000"); // This will update all products

      if (resetError) throw resetError;

      // Then set the selected products as newest picks
      for (let i = 0; i < newestPicks.length; i++) {
        const { error } = await supabase
          .from("products")
          .update({ 
            is_newest_pick: true,
            display_order: i // Use index as display order
          })
          .eq("id", newestPicks[i].id);

        if (error) throw error;
      }

      alert("Newest picks updated successfully!");
      navigate("/dashboard/newest-picks");
    } catch (error) {
      setError(error.message);
      alert(`Error saving changes: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-gold">Loading products...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-serif text-gold mb-6">Select Newest Picks</h2>
      <p className="text-gold/80 mb-6">
        Select up to 10 products to display in the Newest Picks section. You can also
        rearrange the order by using the up and down arrows.
      </p>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div className="bg-white/5 rounded-lg p-6 border border-gold/20">
          <h3 className="text-xl font-serif text-gold mb-4">Current Newest Picks ({newestPicks.length}/10)</h3>
          
          {newestPicks.length === 0 ? (
            <p className="text-gold/80">No products selected as newest picks.</p>
          ) : (
            <div className="space-y-4">
              {newestPicks.map((product, index) => (
                <div key={product.id} className="flex items-center bg-white/5 p-3 rounded">
                  <div className="w-16 h-16 mr-4">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-gold">{product.name}</h4>
                    <p className="text-gold/60 text-sm">{product.type}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className="text-gold hover:text-gold/80 disabled:text-gold/30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveDown(index)}
                      disabled={index === newestPicks.length - 1}
                      className="text-gold hover:text-gold/80 disabled:text-gold/30"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => toggleNewestPick(product)}
                      className="text-red-400 hover:text-red-300 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-6 border border-gold/20 mb-8">
        <h3 className="text-xl font-serif text-gold mb-4">All Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allProducts.map((product) => {
            const isSelected = newestPicks.some((p) => p.id === product.id);
            return (
              <div
                key={product.id}
                className={`p-4 rounded cursor-pointer ${isSelected ? 'bg-gold/20 border border-gold/50' : 'bg-white/5 border border-gold/10 hover:bg-white/10'}`}
                onClick={() => toggleNewestPick(product)}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 mr-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div>
                    <h4 className="text-gold text-sm">{product.name}</h4>
                    <p className="text-gold/60 text-xs">{product.type}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => navigate("/dashboard/newest-picks")}
          className="px-4 py-2 text-gold hover:text-gold/80"
        >
          Cancel
        </button>
        <button
          onClick={saveChanges}
          disabled={saving}
          className="bg-gold text-burgundy px-6 py-2 rounded hover:bg-gold/90 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
