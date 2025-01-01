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
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Elegant jewelry"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1599459183200-59c7687a0c70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
                alt="Ring detail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}