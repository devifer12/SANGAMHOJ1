import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import Overview from "../components/dashboard/Overview";
import NewestPick from "../components/dashboard/NewestPick";
import Collections from "../components/dashboard/Collections";
import Products from "../components/dashboard/Products";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("overview");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/");
        return;
      }
      setUser(data.session.user);
    };

    checkUser();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "overview":
        return <Overview />;
      case "newestPick":
        return <NewestPick />;
      case "collections":
        return <Collections user={user} />;
      case "products":
        return <Products />;
      default:
        return <Overview />;
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview" },
    { id: "newestPick", label: "Newest Pick" },
    { id: "collections", label: "Collections" },
    { id: "products", label: "Products" },
  ];

  return (
    <div className="min-h-screen bg-burgundy pt-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif text-gold">Dashboard</h1>
          <Button onClick={handleSignOut} className="text-sm px-4 py-2">
            Sign Out
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Side Menu */}
          <div className="md:w-64 bg-burgundy/80 rounded-lg border border-gold/20 p-4">
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveComponent(item.id)}
                      className={`w-full text-left px-4 py-2 rounded ${activeComponent === item.id ? "bg-gold/20 text-gold" : "text-gold/70 hover:bg-gold/10"}`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}