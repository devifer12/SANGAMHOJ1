import { useState, useEffect } from 'react';
import NavLink from './NavLink';

export default function NavLinks({ setIsMenuOpen }) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerOptions = {
      threshold: 0.6,
      rootMargin: '-80px 0px 0px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || 'home');
        }
      });
    }, observerOptions);

    const sections = ['collections', 'about', 'contact'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) sectionObserver.observe(element);
    });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) sectionObserver.observe(heroSection);

    // Add smooth scrolling behavior
    const handleLinkClick = (e) => {
      if (e.target.tagName === 'A' && e.target.hash) {
        e.preventDefault();
        const targetId = e.target.hash.slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navbarHeight = 80; // Height of the fixed navbar
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      sectionObserver.disconnect();
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  const handleLinkClick = () => {
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-gold items-center md:justify-end">
      <div onClick={handleLinkClick}>
        <NavLink href="#" active={activeSection === 'home'}>Home</NavLink>
      </div>
      <div onClick={handleLinkClick}>
        <NavLink href="#collections" active={activeSection === 'collections'}>Collections</NavLink>
      </div>
      <div onClick={handleLinkClick}>
        <NavLink href="#about" active={activeSection === 'about'}>About us</NavLink>
      </div>
      <div onClick={handleLinkClick}>
        <NavLink href="#contact" active={activeSection === 'contact'}>Contact</NavLink>
      </div>
    </div>
  );
}