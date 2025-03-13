import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClient';

// Dashboard components
const Collections = React.lazy(() => import('../components/dashboard/Collections'));
const AddCollection = React.lazy(() => import('../components/dashboard/AddCollection'));
const EditCollection = React.lazy(() => import('../components/dashboard/EditCollection'));

export default function Dashboard({ session }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-serif text-gold">Dashboard</h1>
            <Link
              to="/dashboard/add"
              className="bg-gold text-burgundy px-4 py-2 rounded hover:bg-gold/90 transition-colors"
            >
              Add New Collection
            </Link>
          </div>

          <React.Suspense
            fallback={
              <div className="text-gold text-center py-8">Loading...</div>
            }
          >
            <Routes>
              <Route path="/" element={<Collections />} />
              <Route path="/add" element={<AddCollection />} />
              <Route path="/edit/:id" element={<EditCollection />} />
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </div>
  );
}