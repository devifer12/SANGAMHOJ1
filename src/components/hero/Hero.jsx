import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-burgundy overflow-hidden pt-32 mb-6 hero-section">
      <div className="curved-line opacity-10" />
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-26 pb-13">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold leading-tight mb-8">
              SPARKLE &amp; SHINE:
              <br />
              EXQUISITE
              <br />
              ELEGANCE
              <br />
              UNVEILED
            </h1>
            <div className="hidden md:block">
              <Button onClick={() => navigate("/collection")}>
                EXPLORE COLLECTIONS
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <img
                src="https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/HERO%20SECTION/HeroImage.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9IRVJPIFNFQ1RJT04vSGVyb0ltYWdlLnBuZyIsImlhdCI6MTczNzg3NjA4MSwiZXhwIjoxNzY5NDEyMDgxfQ.n1PJNaCFhuQqI3m9Wre1UlT-pxuDpt4tUurYn_FQEbE&t=2025-01-26T07%3A21%3A21.528Z&w=600&q=80"
                alt="Hero Jewelry"
                className="w-full h-full object-contain"
                loading="eager"
                width={600}
                height={600}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
        <div className="md:hidden mt-8 text-center">
          <Button onClick={() => navigate("/collection")}>
            EXPLORE COLLECTIONS
          </Button>
        </div>
      </div>
    </div>
  );
}