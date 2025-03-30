import React from 'react';

export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-gold text-gold px-8 py-3 hover:bg-gold hover:text-burgundy transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
