import React, { useEffect } from "react";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";
import supabase from "../config/supabaseClient";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const AboutImage = supabase.storage.from("ui").getPublicUrl("about us.png").data.publicUrl

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-12">
            About Us
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="w-full">
              <div className="items-start rounded-lg overflow-hidden">
                <img
                  src={AboutImage}
                  alt="About Sangam"
                  className="w-full h-[30rem] object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-gold">
              <h2 className="font-serif text-3xl mb-6">Our Legacy</h2>
              <p className="mb-6">
                At Sangam House of Jewels, we've been crafting exquisite jewelry
                pieces for generations. Our journey began with a simple passion
                for creating beautiful jewelry that tells a story.
              </p>
              <p className="mb-6">
                Each piece we create is a testament to our commitment to
                quality, craftsmanship, and timeless elegance. We blend
                traditional techniques with modern design sensibilities to
                create jewelry that's both classic and contemporary.
              </p>
              <p>
                Our artisans bring decades of experience and expertise to every
                piece, ensuring that each creation meets our high standards of
                excellence and beauty.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}