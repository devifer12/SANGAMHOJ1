import React, { useEffect, useState } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";
import supabase from "../config/supabaseClient";

export default function Collection() {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCollectionsAndProducts();

    // Set up realtime subscription for collections
    const collectionsSubscription = supabase
      .channel("collections-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "collections",
        },
        (payload) => {
          console.log("Collections change received!", payload);
          fetchCollectionsAndProducts();
        }
      )
      .subscribe();

    // Set up realtime subscription for products
    const productsSubscription = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "products",
        },
        (payload) => {
          console.log("Products change received!", payload);
          fetchCollectionsAndProducts();
        }
      )
      .subscribe();

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(collectionsSubscription);
      supabase.removeChannel(productsSubscription);
    };
  }, []);

  async function fetchCollectionsAndProducts() {
    try {
      setLoading(true);
      
      // Fetch collections
      const { data: collectionsData, error: collectionsError } = await supabase
        .from("collections")
        .select("*")
        .order("collection_name", { ascending: true });

      if (collectionsError) throw collectionsError;
      
      // Fetch products with their collection information
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*, collections(id, collection_name)")
        .order("product_name", { ascending: true });

      if (productsError) throw productsError;
      
      setCollections(collectionsData || []);
      setProducts(productsData || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch collections and products");
    } finally {
      setLoading(false);
    }
  }

  // Group products by collection
  const productsByCollection = collections.map(collection => {
    const collectionProducts = products.filter(
      product => product.collection_id === collection.id
    );
    return {
      ...collection,
      products: collectionProducts
    };
  });

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
          ) : productsByCollection.length === 0 ? (
            <div className="text-center text-gold">
              <p>No collections available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="space-y-16">
              {productsByCollection.map((collection) => (
                <div key={collection.id} className="mb-12">
                  <h2 className="font-serif text-3xl text-gold mb-6 border-b border-gold/30 pb-2">
                    {collection.collection_name}
                  </h2>
                  
                  {collection.products.length === 0 ? (
                    <p className="text-gold/80 italic">No products in this collection yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {collection.products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white/5 rounded-lg overflow-hidden"
                        >
                          {product.image_url && (
                            <div className="aspect-square overflow-hidden">
                              <img
                                src={product.image_url}
                                alt={product.product_name}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="font-serif text-2xl text-gold mb-2">
                              {product.product_name}
                            </h3>
                            <p className="text-gold/80">{product.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
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