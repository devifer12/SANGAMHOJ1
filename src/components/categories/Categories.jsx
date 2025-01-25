export default function Categories() {
    const categories = [
      {
        image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/Necklace.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL05lY2tsYWNlLnBuZyIsImlhdCI6MTczNzgxODI3NSwiZXhwIjoxNzY5MzU0Mjc1fQ.XFYqq7bKb5C4uamrvMzFCIjtwp5NfFbs4ZXjoFEtW_E&t=2025-01-25T15%3A17%3A55.253Z",
        title: "NECKLACE"
      },
      {
        image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/CATEGORIES/bangles.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9DQVRFR09SSUVTLyIsImlhdCI6MTczNjM2MTk5NSwiZXhwIjoxNzY3ODk3OTk1fQ.JAXCPtlYcQ63FTPiUBza0DE3FuyZDPPgjX9OaQZGcXI",
        title: "BANGLES"
      },
      {
        image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/CATEGORIES/divine.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9DQVRFR09SSUVTLyIsImlhdCI6MTczNjM2MTk5NSwiZXhwIjoxNzY3ODk3OTk1fQ.JAXCPtlYcQ63FTPiUBza0DE3FuyZDPPgjX9OaQZGcXI",
        title: "DIVINE"
      }
    ];
  
    return (
      <div className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.title} className="group cursor-pointer relative overflow-hidden rounded-lg">
                <div className="aspect-square">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-burgundy bg-opacity-50">
                  <h3 className="font-serif text-2xl text-gold">{category.title}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button className="border-2 border-burgundy text-burgundy px-8 py-3 hover:bg-burgundy hover:text-gold transition-colors">
              EXPLORE
            </button>
          </div>
        </div>
      </div>
    );
  }