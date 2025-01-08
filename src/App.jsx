import React from 'react';
import Navbar from './components/navigation/Navbar';
import Hero from './components/hero/Hero';
import Features from './components/features/Features';
import Collections from './components/collections/Collections';

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Collections />
    </main>
  );
}