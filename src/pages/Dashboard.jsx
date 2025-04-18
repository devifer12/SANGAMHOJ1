import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import supabase from "../config/supabaseClient";

// Dashboard components
const Collections = React.lazy(
  () => import("../components/dashboard/Collections"),
);
const NewestPicks = React.lazy(
  () => import("../components/dashboard/NewestPicks"),
);
const ProductsManager = React.lazy(
  () => import("../components/dashboard/CategoriesManager"),
);
const AddProduct = React.lazy(
  () => import("../components/dashboard/AddProduct"),
);
const EditProduct = React.lazy(
  () => import("../components/dashboard/EditProduct"),
);
const SelectNewestPicks = React.lazy(
  () => import("../components/dashboard/SelectNewestPicks"),
);
 
export default function Dashboard({ session }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("newest-picks");

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  useEffect(() => {
    // Set active section based on current path
    const path = location.pathname;
    if (path.includes("/newest-picks")) setActiveSection("newest-picks");
    else if (path.includes("/products")) setActiveSection("products");
    else if (path.includes("/collections")) setActiveSection("collections");
    else if (path === "/dashboard" || path === "/dashboard/")
      setActiveSection("newest-picks"); // Default to newest-picks
  }, [location.pathname]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-burgundy">
      <nav className="bg-burgundy/95 backdrop-blur-sm border-b border-gold/20 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center text-gold">
                <span className="text-xl font-serif">SANGAM</span>
              </Link>
            </div>
            <div className="flex items-center">
              <span className="text-gold mr-4">{user?.email}</span>
              <button
                onClick={handleSignOut}
                className="text-gold hover:text-gold/80"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Sidebar Navigation */}
            <div className="md:w-64 mb-8 md:mb-0">
              <div className="bg-white/5 rounded-lg p-4 border border-gold/20 sticky top-24">
                <h2 className="font-serif text-xl text-gold mb-6">Dashboard</h2>
                <nav className="space-y-2">
                  <Link
                    to="/dashboard/newest-picks"
                    className={`block px-4 py-2 rounded ${activeSection === "newest-picks" ? "bg-gold/20 text-gold" : "text-gold/80 hover:bg-white/10"}`}
                    onClick={() => setActiveSection("newest-picks")}
                  >
                    The Newest Picks
                  </Link>
                  <Link
                    to="/dashboard/collections"
                    className={`block px-4 py-2 rounded ${activeSection === "collections" ? "bg-gold/20 text-gold" : "text-gold/80 hover:bg-white/10"}`}
                    onClick={() => setActiveSection("collections")}
                  >
                    Collections
                  </Link>
                  <Link
                    to="/dashboard/products"
                    className={`block px-4 py-2 rounded ${activeSection === "products" ? "bg-gold/20 text-gold" : "text-gold/80 hover:bg-white/10"}`}
                    onClick={() => setActiveSection("products")}
                  >
                    Products
                  </Link>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <React.Suspense
                fallback={
                  <div className="text-gold text-center py-8">Loading...</div>
                }
              >
                <Routes>
                  <Route path="/" element={<NewestPicks />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/newest-picks" element={<NewestPicks />} />
                  <Route path="/products" element={<ProductsManager />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/edit-product/:id" element={<EditProduct />} />
                  <Route
                    path="/select-newest-picks"
                    element={<SelectNewestPicks />}
                  />
                </Routes>
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}