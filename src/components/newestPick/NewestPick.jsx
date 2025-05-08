import { useNavigate } from "react-router-dom";

export default function NewestPick() {
  const navigate = useNavigate();

  return (
    <div id="collections" className="bg-white pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-20">
          THE NEWEST PICKS
        </h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="md:w-1/4">
            <div className="text-left">
              <h3 className="font-serif text-3xl text-jewel-green mb-6">
                FEATURED
                <br />
                PRODUCTS
              </h3>
              <p className="text-gray-600 mb-8">
                "Explore our curated selection of featured products, where
                exceptional craftsmanship meets timeless elegance. Handpicked to
                showcase the finest in design and quality, these pieces are perfect
                for every occasion."
              </p>
              <div className="hidden md:block">
                <button
                  onClick={() => navigate("/collection")}
                  className="border border-burgundy text-black px-8 py-3 rounded-full hover:bg-burgundy hover:text-gold transition-colors"
                >
                  EXPLORE NOW
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="group cursor-pointer transform transition-transform hover:scale-105"
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">Sample Product {item}</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl text-jewel-green text-center">
                  Product {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="md:hidden text-center mt-12">
          <button
            onClick={() => navigate("/collection")}
            className="border border-burgundy text-black px-8 py-3 rounded-full hover:bg-burgundy hover:text-gold transition-colors"
          >
            EXPLORE NOW
          </button>
        </div>
      </div>
    </div>
  );
}