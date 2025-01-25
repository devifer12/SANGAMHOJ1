import React from 'react';
import Navbar from './components/navigation/Navbar';
import Hero from './components/hero/Hero';
import Collections from './components/collections/Collections';
import Categories from './components/categories/Categories';
import Testimonials from './components/testimonials/Testimonials';
import Footer from './components/footer/Footer';

export default function App() {
  return (
    <div className="bg-burgundy min-h-screen">
      <Navbar />
      <Hero />
      <Collections />
      <Categories />
      <Testimonials />
      <Footer />
    </div>
  );
}