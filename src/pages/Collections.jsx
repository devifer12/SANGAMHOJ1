import React, { useEffect } from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/footer/Footer';

export default function Collections() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const collections = [
    {
      category: "Necklaces",
      items: [
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Cherrynecklace.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvQ2hlcnJ5bmVja2xhY2UuanBnIiwiaWF0IjoxNzM3ODc5NTE1LCJleHAiOjE3Njk0MTU1MTV9.GlmFsHFmJXp9OrB9dIuTYZj_DDN2TYZe4bLFzbFk6MQ",
          name: "Cherry Necklace",
          description: "Elegant cherry-inspired design in pure gold"
        },
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/JEWELLERY%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0pFV0VMTEVSWSAoMSkuanBnIiwiaWF0IjoxNzM3ODc5MzMyLCJleHAiOjE3Njk0MTUzMzJ9.xGNeWNHFUZhluc2vjUocFEOVyNnVFseuDOZrqxM4AUU",
          name: "Traditional Necklace",
          description: "Classic design with intricate detailing"
        }
      ]
    },
    {
      category: "Bangles",
      items: [
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/BANGLES%20(1).JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0JBTkdMRVMgKDEpLkpQRyIsImlhdCI6MTczNzg3OTM4MiwiZXhwIjoxNzY5NDE1MzgyfQ.3AbrVYsG3fG47CKkhjQzsH3jNwWffvECKOV9q0oe0ts",
          name: "Antique Bangle",
          description: "Traditional antique-finish bangle"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-16">
            Our Collections
          </h1>
          
          {collections.map((collection) => (
            <div key={collection.category} className="mb-16">
              <h2 className="font-serif text-3xl text-gold mb-8">{collection.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collection.items.map((item) => (
                  <div key={item.name} className="bg-white/5 rounded-lg overflow-hidden">
                    <div className="aspect-square">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={400}
                        height={400}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl text-gold mb-2">{item.name}</h3>
                      <p className="text-gold/80">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}