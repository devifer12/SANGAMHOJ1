import { useNavigate } from "react-router-dom";

export default function ExploreCategory() {
  const navigate = useNavigate();

  return (
    <div className="bg-white pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-16">
          EXPLORE CATEGORIES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => navigate("/collection")}
            >
              <div className="p-6">
                <h3 className="font-serif text-2xl text-jewel-green mb-2">
                  Category {item}
                </h3>
                <p className="text-gray-600 mb-4">Sample description</p>
                <button
                  className="border border-burgundy text-black px-6 py-2 rounded-full hover:bg-burgundy hover:text-gold transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/collection");
                  }}
                >
                  EXPLORE
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/collection")}
            className="border border-burgundy text-black px-8 py-3 rounded-full hover:bg-burgundy hover:text-gold transition-colors"
          >
            VIEW ALL COLLECTIONS
          </button>
        </div>
      </div>
    </div>
  );
}