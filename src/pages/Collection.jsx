import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";
import ProductModal from "../components/ui/ProductModal";
import supabase from "../config/supabaseClient";

export default function Collection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        },
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
        },
      )
      .subscribe();

    // Set initial filter if category param exists
    if (categoryParam) {
      setActiveFilter(categoryParam);
    }

    // Cleanup subscriptions on unmount
    return () => {
      supabase.removeChannel(collectionsSubscription);
      supabase.removeChannel(productsSubscription);
    };
  }, [categoryParam]);

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

  // Filter collections based on active filter
  const filteredCollections =
    activeFilter === "all"
      ? collections
      : collections.filter((collection) => {
          // Convert collection name to slug format for comparison
          const collectionSlug = collection.collection_name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-");
          return (
            collectionSlug.includes(activeFilter) ||
            collection.collection_name.toLowerCase().includes(activeFilter)
          );
        });

  // Group products by collection
  const productsByCollection = filteredCollections.map((collection) => {
    const collectionProducts = products.filter(
      (product) => product.collection_id === collection.id,
    );
    return {
      ...collection,
      products: collectionProducts,
    };
  });

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    if (filter === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: filter });
    }
  };

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-8">
            Our Collection
          </h1>

          {/* Collection Filters */}
          {collections.length > 1 && (
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <button
                onClick={() => handleFilterChange("all")}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeFilter === "all"
                    ? "bg-gold text-burgundy font-medium"
                    : "bg-burgundy text-gold border border-gold hover:bg-gold/10"
                }`}
              >
                All Collections
              </button>

              {collections.map((collection) => {
                const collectionSlug = collection.collection_name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-");
                return (
                  <button
                    key={collection.id}
                    onClick={() => handleFilterChange(collectionSlug)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      activeFilter === collectionSlug
                        ? "bg-gold text-burgundy font-medium"
                        : "bg-burgundy text-gold border border-gold hover:bg-gold/10"
                    }`}
                  >
                    {collection.collection_name}
                  </button>
                );
              })}
            </div>
          )}

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
                    <p className="text-gold/80 italic">
                      No products in this collection yet.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {collection.products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white/5 rounded-lg overflow-hidden cursor-pointer group"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {product.image_url && (
                            <div className="aspect-square overflow-hidden relative">
                              <img
                                src={`${product.image_url}?w=400&q=75`}
                                alt={product.product_name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                width={400}
                                height={400}
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <span className="bg-gold/80 text-burgundy px-4 py-2 rounded-full font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                  View Details
                                </span>
                              </div>
                            </div>
                          )}
                          <div className="p-6">
                            <h3 className="font-serif text-2xl text-gold mb-2">
                              {product.product_name}
                            </h3>
                            <p className="text-gold/80">
                              {product.description}
                            </p>
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
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Footer />
    </div>
  );
}