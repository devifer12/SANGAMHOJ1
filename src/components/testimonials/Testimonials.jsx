export default function Testimonials() {
    return (
      <div className="bg-burgundy py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="font-serif text-3xl text-gold mb-12">FROM THE PEOPLE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold mb-8">
                We love hearing from our customers!<br />
                You're the reason we're here and the reason we do what we do.
              </p>
            </div>
            <div className="bg-white/10 p-8 rounded-lg">
              <p className="text-gold mb-6">
                "With a legacy of excellence and a vision for innovation, our director has been the guiding force behind XYZ COMPANY. Passionate about crafting timeless pieces, they bring a perfect blend of artistry and business acumen, ensuring every creation resonates with elegance and authenticity."
              </p>
              <div className="text-gold">
                <p className="font-bold">ABC XYZ</p>
                <p className="text-sm">DIRECTOR</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-full border border-gold text-gold flex items-center justify-center">
                ←
              </button>
              <button className="w-10 h-10 rounded-full border border-gold text-gold flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }