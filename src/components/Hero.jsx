export default function Hero() {
  return (
    <div className="relative min-h-screen bg-jewel-green overflow-hidden">
      <div className="curved-line" />
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-serif text-6xl text-gold leading-tight mb-8">
              SPARKLE & SHINE:<br />
              EXQUISITE<br />
              ELEGANCE<br />
              UNVEILED
            </h2>
            <button className="border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-jewel-green transition-colors">
              EXPLORE COLLECTIONS
            </button>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src=""
                alt="Elegant jewelry"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}