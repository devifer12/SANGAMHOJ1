export default function Testimonials() {
    return (
      <div className="bg-burgundy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl text-gold mb-12">ABOUT THE PEOPLE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold mb-15">
                "Creating Exceptional Gold Stories Together—That’s the Sangam Promise."<br />
                "You're the reason we're here and the reason we do what we do."
              </p>
            </div>
            <div className="bg-white/10 p-8 rounded-lg">
              <p className="text-gold mb-6">
              "At Sangam, our legacy of excellence and vision for innovation define who we are. As a guiding force in the world of fine jewelry, we are driven by a deep passion for creating timeless masterpieces. Every piece we craft is more than just jewelry—it’s a reflection of artistry, precision, and authenticity. With a perfect harmony of creativity and business acumen, we ensure that each creation tells a story of elegance and trust, leaving a lasting impression on all who experience it."
              </p>
              <div className="text-gold">
                <p className="font-bold">RAMAN SOLANKI</p>
                <p className="text-sm">DIRECTOR</p>
              </div>
            </div>
          </div>
          {/* <div className="flex justify-end mt-8">
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-gold text-gold flex items-center justify-center">
                ←
              </button>
              <button className="w-10 h-10 rounded-full border border-gold text-gold flex items-center justify-center">
                →
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  }