import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        }
      });

      if (error) {
        setError(error.message);
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      <button 
        className="border-2 border-gold text-gold px-6 py-2 rounded-full hover:bg-gold hover:text-burgundy transition-colors disabled:opacity-50"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 bg-red-500/10 border border-red-500 text-red-500 text-sm rounded">
          {error}
        </div>
      )}
    </div>
  );
}