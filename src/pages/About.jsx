import React, { useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/footer/Footer';

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-16">
            About Us
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/HERO%20SECTION/HeroImage.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9IRVJPIFNFQ1RJT04vSGVyb0ltYWdlLnBuZyIsImlhdCI6MTczNzg3NjA4MSwiZXhwIjoxNzY5NDEyMDgxfQ.n1PJNaCFhuQqI3m9Wre1UlT-pxuDpt4tUurYn_FQEbE"
                alt="About Sangam"
                className="w-full rounded-lg"
                loading="eager"
              />
            </div>
            <div className="text-gold">
              <h2 className="font-serif text-3xl mb-6">Our Legacy</h2>
              <p className="mb-6">
                At Sangam House of Jewels, we've been crafting exquisite jewelry pieces for generations. Our journey began with a simple passion for creating beautiful jewelry that tells a story.
              </p>
              <p className="mb-6">
                Each piece we create is a testament to our commitment to quality, craftsmanship, and timeless elegance. We blend traditional techniques with modern design sensibilities to create jewelry that's both classic and contemporary.
              </p>
              <p>
                Our artisans bring decades of experience and expertise to every piece, ensuring that each creation meets our high standards of excellence and beauty.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}