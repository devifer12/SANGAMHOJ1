import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCollections(data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this collection?')) return;

    try {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCollections(collections.filter(collection => collection.id !== id));
    } catch (error) {
      console.error('Error deleting collection:', error);
    }
  }

  if (loading) return <div className="text-gold">Loading collections...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  if (collections.length === 0) {
    return (
      <div className="text-center text-gold py-8">
        <p className="mb-4">No collections found.</p>
        <Link
          to="/dashboard/add"
          className="inline-block bg-gold text-burgundy px-4 py-2 rounded hover:bg-gold/90 transition-colors"
        >
          Create your first collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collections.map((collection) => (
        <div
          key={collection.id}
          className="bg-white/5 rounded-lg p-6 border border-gold/20"
        >
          <div className="aspect-square mb-4">
            <img
              src={collection.image_url}
              alt={collection.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <h3 className="text-xl font-serif text-gold mb-2">{collection.name}</h3>
          <p className="text-gold/80 mb-4">{collection.description}</p>
          <div className="flex justify-between">
            <Link
              to={`/dashboard/edit/${collection.id}`}
              className="text-gold hover:text-gold/80"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(collection.id)}
              className="text-red-400 hover:text-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}