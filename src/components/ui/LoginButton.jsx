import React, { useState } from 'react';
import supabase from '../../config/supabaseClient';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });

      if (error) {
        console.error('Error logging in:', error.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className="border-2 border-gold text-gold px-6 py-2 rounded-full hover:bg-gold hover:text-burgundy transition-colors disabled:opacity-50"
      onClick={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Login'}
    </button>
  );
}