import { useState, useEffect } from 'react';
import NavLink from './NavLink';

export default function NavLinks() {
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

    return () => sectionObserver.disconnect();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-gold items-center md:justify-end">
      <NavLink href="#" active={activeSection === 'home'}>Home</NavLink>
      <NavLink href="#collections" active={activeSection === 'collections'}>Collections</NavLink>
      <NavLink href="#about" active={activeSection === 'about'}>About us</NavLink>
      <NavLink href="#contact" active={activeSection === 'contact'}>Contact</NavLink>
    </div>
  );
}