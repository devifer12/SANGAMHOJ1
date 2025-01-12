import HeroContent from './HeroContent';
import HeroImages from './HeroImages';

export default function Hero() {
  return (
    <div id="hero" className="relative min-h-screen bg-jewel-green overflow-hidden">
      <div className="curved-line opacity-10" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="order-2 md:order-none">
            <HeroContent />
          </div>
          <div className="order-1 md:order-none">
            <HeroImages />
          </div>
        </div>
      </div>
    </div>
  );
}