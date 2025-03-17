import Logo from "../ui/Logo";
import NavLinks from "./NavLinks";
import { useState } from "react";
import LoginButton from "../ui/LoginButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [showLoginButton, setShowLoginButton] = useState(false);

  const handleLogoTap = () => {
    setTapCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount >= 4) {
        setShowLoginButton(true);
        return 0; // Reset count after showing login
      }
      return newCount;
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-burgundy/95 px-4 md:px-6 border-b border-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20">
          {/* Logo container */}
          <div className="px-5 w-40 cursor-pointer" onClick={handleLogoTap}>
            <Logo />
          </div>

          {/* Navigation links - desktop */}
          <div className="hidden md:block flex-1">
            <NavLinks />
          </div>

          {/* Login button */}
          {showLoginButton && (
            <div className="hidden md:block mr-4">
              <LoginButton />
            </div>
          )}

          {/* Mobile menu button - moved to the right */}
          <button
            className="md:hidden text-gold ml-auto z-20 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} md:hidden mt-4 pb-4`}
        >
          <NavLinks setIsMenuOpen={setIsMenuOpen} />
          {showLoginButton && (
            <div className="mt-4 flex justify-center">
              <LoginButton />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
