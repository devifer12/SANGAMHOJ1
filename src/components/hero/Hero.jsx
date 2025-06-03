import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import supabase from "../../config/supabaseClient";

export default function Hero() {
  const navigate = useNavigate();
  const HeroImage = supabase.storage.from("ui").getPublicUrl("HeroImage.png")
    .data.publicUrl;

  return (
    <div className="relative h-auto pt-36 md:h-[100vh] bg-burgundy overflow-hidden md:pt-[9%] hero-section">
      <div className="curved-line opacity-10" />
      <div className="max-w-7xl mx-auto px-4 pb-4 md:px-6 pt-26">
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
            <div className="flex items-center justify-center overflow-hidden">
              <img
                src={HeroImage}
                alt="Hero Image"
                className=" w-60% h-80% "
                loading="lazy"
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