export default function Collections() {
  const collections = [
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Cherry%20necklace.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvQ2hlcnJ5IG5lY2tsYWNlLmpwZyIsImlhdCI6MTczNzg3NjE0OSwiZXhwIjoxNzY5NDEyMTQ5fQ.8-uhF_66bRTW8VrJH1Iy98yopynPIrz2sz-sEVtA68I&t=2025-01-26T07%3A22%3A29.219Z",
      title: "CHERRY NECKLACE"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Kids%20bracelet.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvS2lkcyBicmFjZWxldC5qcGciLCJpYXQiOjE3Mzc4NzYxNzIsImV4cCI6MTc2OTQxMjE3Mn0.S2k_Blj0sTv6zEU9I9xTaU_fs7sdqrFkC5WHvAuB9Fs&t=2025-01-26T07%3A22%3A52.144Z",
      title: "KIDS BRACELET"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Antique%20Bangle.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvQW50aXF1ZSBCYW5nbGUuanBnIiwiaWF0IjoxNzM3ODc2MTk4LCJleHAiOjE3Njk0MTIxOTh9.TibXyKXLxYhjA9QUJNrdD8-P2lNsunD5QM15a2JcgFs&t=2025-01-26T07%3A23%3A17.906Z",
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
                <button className="border border-jewel-green text-jewel-green px-8 py-3 rounded-full hover:bg-jewel-green hover:text- transition-colors">
                  EXPLORE NOW
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {collections.map((collection) => (
              <div key={collection.title} className="group cursor-pointer">
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
          <button className="border border-jewel-green text-jewel-green px-8 py-3 rounded-full hover:bg-jewel-green hover:text-white transition-colors">
            EXPLORE NOW
          </button>
        </div>
      </div>
    </div>
  );
}