export default function Collections() {
  const collections = [
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/RADIANCE%20NECKLACE.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvUkFESUFOQ0UgTkVDS0xBQ0UuSlBHIiwiaWF0IjoxNzM2MzYxOTk1LCJleHAiOjE3Njc4OTc5OTV9.JAXCPtlYcQ63FTPiUBza0DE3FuyZDPPgjX9OaQZGcXI",
      title: "RADIANCE NECKLACE"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Exquisite%20SETS.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhxdWlzaXRlIFNFVFMuSlBHIiwiaWF0IjoxNzM2MzYyMTY0LCJleHAiOjE3Njc4OTgxNjR9.unombe_NpsF9mtC0b1nFEM-IHtO6eF9NcZCz8r-4Gr4",
      title: "EXQUISITE SETS"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/GLAMOURS%20BANGLES.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvR0xBTU9VUlMgQkFOR0xFUy5KUEciLCJpYXQiOjE3MzYzNjI1MTQsImV4cCI6MTc2Nzg5ODUxNH0.SWKx4iXVxSKaCZVMauuR0UguTeY2FAVJno4WoxQXWTo",
      title: "GLAMOUR BANGLES"
    }
  ];

  return (
    <div id="collections" className="bg-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-20">
          OUR COLLECTIONS
        </h2>
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Featured Products Section */}
          <div className="md:w-1/4">
            <div className="text-left">
              <h3 className="font-serif text-3xl text-jewel-green mb-6">
                FEATURED<br />PRODUCTS
              </h3>
              <p className="text-gray-600 mb-8">
                "Explore our curated selection of featured products, where exceptional craftsmanship meets timeless elegance. Handpicked to showcase the finest in design and quality, these pieces are perfect for every occasion."
              </p>
              <button className="border border-jewel-green text-jewel-green px-8 py-3 rounded-full hover:bg-jewel-green hover:text-white transition-colors">
                EXPLORE NOW
              </button>
            </div>
          </div>

          {/* Collection Cards */}
          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {collections.map((collection) => (
              <div key={collection.title} className="group cursor-pointer">
                <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <h3 className="font-serif text-xl text-jewel-green text-center">
                  {collection.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}