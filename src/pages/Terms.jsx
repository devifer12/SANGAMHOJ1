import React, { useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/footer/Footer';

export default function Terms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-16">
            Terms of Service
          </h1>
          
          <div className="prose prose-lg max-w-none text-gold">
            <section className="mb-12">
              <h2 className="font-serif text-2xl text-gold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gold/80">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-gold mb-4">2. Use License</h2>
              <p className="text-gold/80">
                Permission is granted to temporarily download one copy of the materials (information or software) on Sangam House of Jewels's website for personal, non-commercial transitory viewing only.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-gold mb-4">3. Disclaimer</h2>
              <p className="text-gold/80">
                The materials on Sangam House of Jewels's website are provided on an 'as is' basis. Sangam House of Jewels makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-gold mb-4">4. Limitations</h2>
              <p className="text-gold/80">
                In no event shall Sangam House of Jewels or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Sangam House of Jewels's website.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}