import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

export default function NavLinks({ setIsMenuOpen }) {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const observerOptions = {
        threshold: 0.3,
        rootMargin: "-80px 0px 0px 0px",
      };

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || "home");
          }
        });
      }, observerOptions);

      // Observe hero section first
      const heroSection = document.querySelector(".hero-section");
      if (heroSection) {
        heroSection.id = "home";
        sectionObserver.observe(heroSection);
      }

      // Then observe other sections
      const sections = ["collections", "about", "contact"];
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) sectionObserver.observe(element);
      });

      return () => {
        sectionObserver.disconnect();
      };
    }
  }, [location.pathname]);

  const handleLinkClick = () => {
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-gold items-center md:justify-end">
      <div onClick={handleLinkClick}>
        <Link
          to="/"
          className={`transition-all duration-300 border-b-2 ${
            location.pathname === "/" && activeSection === "home"
              ? "border-gold"
              : "border-transparent hover:border-gold/50"
          }`}
        >
          Home
        </Link>
      </div>
      <div onClick={handleLinkClick}>
        <Link
          to="/collections"
          className={`transition-all duration-300 border-b-2 ${
            location.pathname === "/collections"
              ? "border-gold"
              : "border-transparent hover:border-gold/50"
          }`}
        >
          Collections
        </Link>
      </div>
      <div onClick={handleLinkClick}>
        <Link
          to="/about"
          className={`transition-all duration-300 border-b-2 ${
            location.pathname === "/about"
              ? "border-gold"
              : "border-transparent hover:border-gold/50"
          }`}
        >
          About Us
        </Link>
      </div>
      <div onClick={handleLinkClick}>
        <Link
          to="/contact"
          className={`transition-all duration-300 border-b-2 ${
            location.pathname === "/contact"
              ? "border-gold"
              : "border-transparent hover:border-gold/50"
          }`}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}