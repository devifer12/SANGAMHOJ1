import Logo from '../ui/Logo';
import NavLinks from './NavLinks';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-jewel-green/95 backdrop-blur-sm border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex w-full md:w-auto justify-between items-center">
            <Logo />
            <button 
              className="md:hidden text-gold hover:text-gold/80 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto transition-all duration-300 ease-in-out`}>
            <NavLinks />
          </div>
        </div>
      </div>
    </nav>
  );
}