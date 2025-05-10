import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";

export default function ExploreCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    { name: "Chains", image: null, slug: "chains" },
    { name: "Jewellery's", image: null, slug: "jewellery" },
    { name: "Antique", image: null, slug: "antique" },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategoryImages() {
      try {
        setLoading(true);
        const imageNames = [
          "ChainCategory",
          "JewelleryCategory",
          "AntiqueCategory",
        ];
        const updatedCategories = [...categories];

        for (let i = 0; i < imageNames.length; i++) {
          const { data, error } = await supabase.storage
            .from("explorecategory")
            .getPublicUrl(`${imageNames[i]}.png`);

          if (error) {
            console.error(`Error fetching ${imageNames[i]} image:`, error);
            continue;
          }

          if (data) {
            updatedCategories[i].image = data.publicUrl;
          }
        }

        setCategories(updatedCategories);
      } catch (err) {
        console.error("Error fetching category images:", err);
        setError("Failed to load category images");
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryImages();
  }, []);

  return (
    <div className="bg-white pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-16">
          EXPLORE CATEGORIES
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => navigate(`/collection?category=${category.slug}`)}
            >
              <div className="aspect-square overflow-hidden bg-white flex items-center justify-center">
                {loading ? (
                  <div className="w-12 h-12 border-4 border-jewel-green border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  category.image && (
                    <img
                      src={`${category.image}?w=300&q=75`}
                      alt={category.name}
                      className="w-full h-full object-contain p-4"
                      loading="lazy"
                      width={300}
                      height={300}
                    />
                  )
                )}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-jewel-green mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore our {category.name.toLowerCase()} collection
                </p>
                <button
                  className="border border-burgundy text-black px-6 py-2 rounded-full hover:bg-burgundy hover:text-gold transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/collection?category=${category.slug}`);
                  }}
                >
                  EXPLORE
                </button>
              </div>
            </div>
          ))}
        </div>

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