import React, { useState } from 'react';
import AuthModal from '../auth/AuthModal';

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="relative">
        <button 
          className="border-2 border-gold text-gold px-6 py-2 rounded-full hover:bg-gold hover:text-burgundy transition-colors disabled:opacity-50"
          onClick={() => setShowModal(true)}
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

      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
      />
    </>
  );
}