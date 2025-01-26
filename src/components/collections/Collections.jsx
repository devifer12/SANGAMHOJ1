import { useNavigate } from 'react-router-dom';

export default function Collections() {
  const navigate = useNavigate();
  const collections = [
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Cherrynecklace.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvQ2hlcnJ5bmVja2xhY2UuanBnIiwiaWF0IjoxNzM3ODc5NTE1LCJleHAiOjE3Njk0MTU1MTV9.GlmFsHFmJXp9OrB9dIuTYZj_DDN2TYZe4bLFzbFk6MQ",
      title: "CHERRY NECKLACE"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Kidsbracelet.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvS2lkc2JyYWNlbGV0LmpwZyIsImlhdCI6MTczNzg3OTE3OSwiZXhwIjoxNzY5NDE1MTc5fQ.cak9hY9IssX1eiiTnwfjqqR2DQDr8Z7SVJQSD4cEc0k&t=2025-01-26T08%3A12%3A59.760Z",
      title: "KIDS BRACELET"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/AntiqueBangle.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvQW50aXF1ZUJhbmdsZS5qcGciLCJpYXQiOjE3Mzc4NzkxNDYsImV4cCI6MTc2OTQxNTE0Nn0.486wP6ctLR6rP9XU6rBFhx4P7q6u1BcqIZp5AaRq8Gw&t=2025-01-26T08%3A12%3A26.236Z",
      title: "ANTIQUE BANGLE"
    }
  ];

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
                FEATURED<br />PRODUCTS
              </h3>
              <p className="text-gray-600 mb-8">
                "Explore our curated selection of featured products, where exceptional craftsmanship meets timeless elegance. Handpicked to showcase the finest in design and quality, these pieces are perfect for every occasion."
              </p>
              <div className="hidden md:block">
                <button 
                  onClick={() => navigate('/collections')}
                  className="border border-jewel-green text-jewel-green px-8 py-3 rounded-full hover:bg-jewel-green hover:text-white transition-colors"
                >
                  EXPLORE NOW
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {collections.map((collection) => (
              <div 
                key={collection.title} 
                className="group cursor-pointer"
                onClick={() => navigate('/collections')}
              >
                <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-contain p-4"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                </div>
                <h3 className="font-serif text-xl text-jewel-green text-center">
                  {collection.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div className="md:hidden text-center mt-12">
          <button 
            onClick={() => navigate('/collections')}
            className="border border-jewel-green text-jewel-green px-8 py-3 rounded-full hover:bg-jewel-green hover:text-white transition-colors"
          >
            EXPLORE NOW
          </button>
        </div>
      </div>
    </div>
  );
}