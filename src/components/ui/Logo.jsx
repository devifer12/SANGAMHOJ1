import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";

export default function Logo({ onLogoClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();
  const Logo = supabase.storage.from("ui").getPublicUrl("Sangam new logo 01.png").data.publicUrl

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Increment click count and check if it's 4
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (newClickCount === 4) {
      // Reset click count and trigger the callback
      setClickCount(0);
      if (onLogoClick) {
        onLogoClick();
      }
    }
  };

  return (
    <div
      className="text-gold relative h-20 cursor-pointer"
      onClick={handleLogoClick}
    >
      {/* Desktop view - always visible */}
      <div className="hidden md:flex items-center h-full">
          <img
            src={Logo}
            alt="Sangam House of Jewels"
            className="w-[100%] h-full object-contain"
            loading="eager"
          />
      </div>
      {/* Mobile view with transition */}
      <div className="md:hidden flex items-center h-full">
        <img 
        src={Logo}
        alt="Sangam House of Jewels"
        className={`w-[70%] h-full object-contain`} 
        />
      </div>
    </div>
  );
}
