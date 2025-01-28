import React, { useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/footer/Footer';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-16">
            Contact Us
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 p-8 rounded-lg">
              <h2 className="font-serif text-2xl text-gold mb-6">Get in Touch</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white/10 border-gold/30 rounded-md text-gold"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/10 border-gold/30 rounded-md text-gold"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gold mb-2">Message</label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full bg-white/10 border-gold/30 rounded-md text-gold"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-burgundy py-2 rounded-md hover:bg-gold/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div className="text-gold">
              <h2 className="font-serif text-2xl mb-6">Visit Our Store</h2>
              <div className="space-y-4">
                <p>
                  <strong>Address:</strong><br />
                  702, DD JEWELS,7th FLOOR,<br />
                  1st AGAIRY LANE,ZAVERI BAZZAR,<br />
                  KALBADEVI ROAD,Mumbai, 400002
                </p>
                <p>
                  <strong>Phone:</strong><br />
                  +91 9920033377
                </p>
                <p>
                  <strong>Email:</strong><br />
                  sangamhoj@gmail.com
                </p>
                <p>
                  <strong>Hours:</strong><br />
                  Monday - Saturday: 11:00 AM - 8:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
