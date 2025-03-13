import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

export default function EditCollection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    image_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCollection();
  }, [id]);

  async function fetchCollection() {
    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) setFormData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('collections')
        .update(formData)
        .eq('id', id);

      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="text-gold">Loading collection...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-serif text-gold mb-6">Edit Collection</h2>
      
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
            rows="4"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-gold mb-2">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
          >
            <option value="">Select type</option>
            <option value="CHAIN">Chain</option>
            <option value="JEWELLERY">Jewellery</option>
            <option value="ANTIQUE">Antique</option>
          </select>
        </div>

        <div>
          <label htmlFor="image_url" className="block text-gold mb-2">
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border border-gold/30 rounded p-2 text-gold"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-gold hover:text-gold/80"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-burgundy px-4 py-2 rounded hover:bg-gold/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}