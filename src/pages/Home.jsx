import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Hero from '../components/hero/Hero';
import NewestPick from '../components/newestPick/NewestPick';
import Testimonials from '../components/testimonials/Testimonials';
import Footer from '../components/footer/Footer';
import ExploreCategory from '../components/exploreCategory/ExploreCategory';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    // Handle scroll to section after navigation
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      // Clear the state to prevent scrolling on subsequent renders
      window.history.replaceState({}, document.title);
    } else {
      // Scroll to top when navigating to home without a specific section
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="bg-burgundy min-h-screen">
      <Navbar />
      <Hero />
      <NewestPick />
      <ExploreCategory />
      <Testimonials />
      <Footer />
    </div>
  );
}