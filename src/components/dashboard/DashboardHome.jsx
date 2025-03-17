import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function DashboardHome() {
  const [sections, setSections] = useState([
    {
      id: "newest-picks",
      title: "THE NEWEST PICKS",
      route: "/dashboard/newest-picks",
    },
    {
      id: "categories",
      title: "EXPLORE CATEGORIES",
      route: "/dashboard/categories",
    },
    {
      id: "collections",
      title: "COLLECTIONS",
      route: "/dashboard/collections",
    },
  ]);

  const [stats, setStats] = useState({
    collections: 0,
    products: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Get collections count
        const { data: collections, error: collectionsError } = await supabase
          .from("collections")
          .select("id");

        if (collectionsError) throw collectionsError;

        // Get products count with count aggregation
        const { count: productsCount, error: productsError } = await supabase
          .from("products")
          .select("*", { count: "exact", head: true });

        if (productsError) throw productsError;

        setStats({
          collections: collections?.length || 0,
          products: productsCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();

    // Set up realtime subscription for stats updates
    const collectionsSubscription = supabase
      .channel("collections-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "collections" },
        fetchStats,
      )
      .subscribe();

    const productsSubscription = supabase
      .channel("products-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        fetchStats,
      )
      .subscribe();

    return () => {
      supabase.removeChannel(collectionsSubscription);
      supabase.removeChannel(productsSubscription);
    };
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-serif text-gold mb-8">
        Welcome to Your Dashboard
      </h1>

      {loading ? (
        <div className="text-gold">Loading dashboard data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 rounded-lg p-6 border border-gold/20">
              <h3 className="text-xl font-serif text-gold mb-2">Collections</h3>
              <p className="text-3xl text-gold">{stats.collections}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-6 border border-gold/20">
              <h3 className="text-xl font-serif text-gold mb-2">Products</h3>
              <p className="text-3xl text-gold">{stats.products}</p>
            </div>
          </div>

          <h2 className="text-2xl font-serif text-gold mb-6">
            Manage Your Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Link
                key={section.id}
                to={section.route}
                className="bg-white/5 rounded-lg p-6 border border-gold/20 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-serif text-gold mb-4">
                  {section.title}
                </h3>
                <p className="text-gold/80 mb-4">
                  Manage your {section.title.toLowerCase()}
                </p>
                <span className="text-gold hover:text-gold/80">Edit →</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
