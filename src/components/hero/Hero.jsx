import Button from '../ui/Button';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-burgundy overflow-hidden pt-32 mb-6 hero-section">
      <div className="curved-line opacity-10" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-26 pb-13">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold leading-tight mb-8">
              SPARKLE &amp; SHINE:<br />
              EXQUISITE<br />
              ELEGANCE<br />
              UNVEILED
            </h1>
            <div className="hidden md:block">
              <Button>EXPLORE COLLECTIONS</Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img 
                src="https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/HERO%20SECTION/HeroImage.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9IRVJPIFNFQ1RJT04vSGVyb0ltYWdlLnBuZyIsImlhdCI6MTczNjM1ODg5NCwiZXhwIjoxNzk5NDMwODk0fQ.oTgk5IAOTAKDjBeG5GuXFQIApTAr4I3E8YuVRJnnZ-Y&t=2025-01-08T17%3A54%3A54.822Z"
                alt="Hero Jewelry"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        <div className="md:hidden mt-8 text-center">
          <Button>EXPLORE COLLECTIONS</Button>
        </div>
      </div>
    </div>
  );
}