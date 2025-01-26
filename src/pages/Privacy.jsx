import React, { useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/footer/Footer';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-16">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-gold">
            <section className="mb-12">
              <h2 className="font-serif text-2xl text-gold mb-4">Information We Collect</h2>
              <p className="mb-4">
                We collect information that you provide directly to us, including when you:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gold/80">
                <li>Create an account</li>
                <li>Make a purchase</li>
                <li>Sign up for our newsletter</li>
                <li>Contact us for support</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-gold mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-gold/80">
                <li>Process your orders</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-gold mb-4">Information Security</h2>
              <p className="text-gold/80">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}