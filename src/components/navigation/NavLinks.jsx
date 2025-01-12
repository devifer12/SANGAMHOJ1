import { useState, useEffect } from 'react';
import NavLink from './NavLink';

export default function NavLinks() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = ['hero', 'collections'];
    const observers = {};

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        observers[sectionId] = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveSection(sectionId);
              }
            });
          },
          { threshold: 0.5 }
        );
        observers[sectionId].observe(element);
      }
    });

    return () => {
      sections.forEach(sectionId => {
        if (observers[sectionId]) {
          observers[sectionId].disconnect();
        }
      });
    };
  }, []);

  // Don't show any active link when on hero section
  const isOnHero = activeSection === 'hero';

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-gold w-full md:w-auto items-center py-4 md:py-0">
      <NavLink 
        href="#collections" 
        active={!isOnHero && activeSection === 'collections'}
      >
        Collections
      </NavLink>
      <NavLink href="#features">About</NavLink>
      <NavLink href="#contact">Contact</NavLink>
    </div>
  );
}