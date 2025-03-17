import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../config/supabaseClient";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    {
      image:
        "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/Chains.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0NoYWlucy5wbmciLCJpYXQiOjE3Mzc4NzkzNTIsImV4cCI6MTc2OTQxNTM1Mn0.qF_Kjbv6bV60rFhe8vypEQqH1xKhKxHFE0sjfgi0SKg&t=2025-01-26T08%3A15%3A52.359Z",
      title: "CHAINS",
    },
    {
      image:
        "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/JEWELLERY%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0pFV0VMTEVSWSAoMSkuanBnIiwiaWF0IjoxNzM3ODc5MzMyLCJleHAiOjE3Njk0MTUzMzJ9.xGNeWNHFUZhluc2vjUocFEOVyNnVFseuDOZrqxM4AUU",
      title: "JEWELLERY",
    },
    {
      image:
        "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/BANGLES%20(1).JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0JBTkdMRVMgKDEpLkpQRyIsImlhdCI6MTczNzg3OTM4MiwiZXhwIjoxNzY5NDE1MzgyfQ.3AbrVYsG3fG47CKkhjQzsH3jNwWffvECKOV9q0oe0ts",
      title: "BANGLES",
    },
  ]);

  useEffect(() => {
    // Fetch categories from the database
    async function fetchCategories() {
      try {
        const { data, error } = await supabase.from("categories").select("*");

        if (error) throw error;
        if (data && data.length > 0) {
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();

    // Set up realtime subscription for categories updates
    const subscription = supabase
      .channel("categories-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "categories" },
        fetchCategories,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className="bg-white py-5">
      <div className="max-w-7xl mx-auto py-2 px-4 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-16">
          EXPLORE CATEGORIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group cursor-pointer relative"
              onClick={() => navigate("/collections")}
            >
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={400}
                  height={400}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-burgundy bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden">
                <h3 className="font-serif text-2xl text-gold bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {category.title}
                </h3>
              </div>
              <h3 className="font-serif text-2xl text-jewel-green text-center mt-4 md:hidden">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/collections")}
            className="border-2 border-burgundy text-burgundy px-8 py-3 hover:bg-burgundy hover:text-gold transition-colors"
          >
            EXPLORE
          </button>
        </div>
      </div>
    </div>
  );
}
