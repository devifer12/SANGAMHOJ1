import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function CategoriesManager() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    title: "",
    image: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddCategory = async () => {
    if (!newCategory.title || !newCategory.image) {
      alert("Please fill in all fields");
      return;
    }

    try {
      let result;

      if (newCategory.id) {
        // Update existing category
        const { data, error } = await supabase
          .from("categories")
          .update({
            title: newCategory.title,
            image: newCategory.image,
            updated_at: new Date(),
          })
          .eq("id", newCategory.id)
          .select();

        if (error) throw error;
        result = data[0];
      } else {
        // Insert new category
        const { data, error } = await supabase
          .from("categories")
          .insert({
            title: newCategory.title,
            image: newCategory.image,
          })
          .select();

        if (error) throw error;
        result = data[0];
      }

      // Refresh the categories list
      fetchCategories();
      setNewCategory({ title: "", image: "" });
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error saving category:", error);
      alert(`Error saving category: ${error.message}`);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const { error } = await supabase.from("categories").delete().eq("id", id);

      if (error) throw error;

      // Refresh the categories list
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(`Error deleting category: ${error.message}`);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Upload to Supabase storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `categories/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("SITE IMAGES")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage
        .from("SITE IMAGES")
        .getPublicUrl(filePath);

      setNewCategory({ ...newCategory, image: data.publicUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(`Error uploading image: ${error.message}`);
    }
  };

  if (loading) return <div className="text-gold">Loading categories...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-serif text-gold">Manage Categories</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gold text-burgundy px-4 py-2 rounded hover:bg-gold/90 transition-colors"
        >
          Add New Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white/5 rounded-lg p-6 border border-gold/20"
          >
            <div className="aspect-square mb-4">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h3 className="text-xl font-serif text-gold mb-2">
              {category.title}
            </h3>
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setNewCategory(category);
                  setIsAddModalOpen(true);
                }}
                className="text-gold hover:text-gold/80"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCategory(category.id)}
                className="text-red-400 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-burgundy rounded-lg w-full max-w-md p-6 border border-gold/20">
            <h3 className="text-xl font-serif text-gold mb-4">
              {newCategory.id ? "Edit Category" : "Add New Category"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gold mb-2">Title</label>
                <input
                  type="text"
                  value={newCategory.title}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, title: e.target.value })
                  }
                  className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
                  placeholder="Category Title"
                />
              </div>
              <div>
                <label className="block text-gold mb-2">Image</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-gold"
                  />
                  {newCategory.image && (
                    <div className="w-16 h-16 rounded overflow-hidden">
                      <img
                        src={newCategory.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setNewCategory({ title: "", image: "" });
                  }}
                  className="px-4 py-2 text-gold hover:text-gold/80"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCategory}
                  className="bg-gold text-burgundy px-4 py-2 rounded hover:bg-gold/90 transition-colors"
                >
                  {newCategory.id ? "Save Changes" : "Add Category"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
