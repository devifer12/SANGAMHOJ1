import Logo from '../ui/Logo';
import NavLinks from './NavLinks';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-burgundy/95 backdrop-blur-sm px-4 md:px-6 py-2 border-b border-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center relative">
          <div className="flex-1">
            <Logo />
          </div>
          <div className="hidden md:block">
            <NavLinks />
          </div>
          <button 
            className="md:hidden text-gold absolute right-0 top-1/2 -translate-y-1/2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <NavLinks />
        </div>
      </div>
    </nav>
  );
}