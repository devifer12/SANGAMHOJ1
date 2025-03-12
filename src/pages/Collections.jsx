import React, { useEffect, useState } from 'react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/footer/Footer';

export default function Collections() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const collections = [
    {
      category: "CHAINS",
      items: [
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Cherrynecklace.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvQ2hlcnJ5bmVja2xhY2UuanBnIiwiaWF0IjoxNzM3ODc5NTE1LCJleHAiOjE3Njk0MTU1MTV9.GlmFsHFmJXp9OrB9dIuTYZj_DDN2TYZe4bLFzbFk6MQ",
          name: "IRIS CHAIN",
          description: "Elegant C-Z inspired design in pure gold",
          type: "CHAIN"
        },
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Chains.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvQ2hhaW5zLnBuZyIsImlhdCI6MTcwNzIxNDU1MiwiZXhwIjoxNzM4NzUwNTUyfQ.qF_Kjbv6bV60rFhe8vypEQqH1xKhKxHFE0sjfgi0SKg",
          name: "LOTUS CHAIN",
          description: "Delicate lotus-inspired chain design",
          type: "CHAIN"
        },
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Chains.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvQ2hhaW5zLnBuZyIsImlhdCI6MTcwNzIxNDU1MiwiZXhwIjoxNzM4NzUwNTUyfQ.qF_Kjbv6bV60rFhe8vypEQqH1xKhKxHFE0sjfgi0SKg",
          name: "ROSE CHAIN",
          description: "Rose-patterned chain with intricate details",
          type: "CHAIN"
        }
      ]
    },
    {
      category: "JEWELLERY",
      items: [
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/JEWELLERY%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0pFV0VMTEVSWSAoMSkuanBnIiwiaWF0IjoxNzM3ODc5MzMyLCJleHAiOjE3Njk0MTUzMzJ9.xGNeWNHFUZhluc2vjUocFEOVyNnVFseuDOZrqxM4AUU",
          name: "Traditional Necklace Set",
          description: "Classic design with intricate detailing",
          type: "JEWELLERY"
        },
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/JEWELLERY%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0pFV0VMTEVSWSAoMSkuanBnIiwiaWF0IjoxNzM3ODc5MzMyLCJleHAiOjE3Njk0MTUzMzJ9.xGNeWNHFUZhluc2vjUocFEOVyNnVFseuDOZrqxM4AUU",
          name: "Pearl Necklace Set",
          description: "Elegant pearl-studded jewelry set",
          type: "JEWELLERY"
        },
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/JEWELLERY%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0pFV0VMTEVSWSAoMSkuanBnIiwiaWF0IjoxNzM3ODc5MzMyLCJleHAiOjE3Njk0MTUzMzJ9.xGNeWNHFUZhluc2vjUocFEOVyNnVFseuDOZrqxM4AUU",
          name: "Diamond Necklace Set",
          description: "Premium diamond-studded jewelry set",
          type: "JEWELLERY"
        }
      ]
    },
    {
      category: "ANTIQUE COLLECTION",
      items: [
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/BANGLES%20(1).JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0JBTkdMRVMgKDEpLkpQRyIsImlhdCI6MTczNzg3OTM4MiwiZXhwIjoxNzY5NDE1MzgyfQ.3AbrVYsG3fG47CKkhjQzsH3jNwWffvECKOV9q0oe0ts",
          name: "Antique Bangle",
          description: "Traditional antique-finish bangle",
          type: "ANTIQUE"
        },
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/BANGLES%20(1).JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0JBTkdMRVMgKDEpLkpQRyIsImlhdCI6MTczNzg3OTM4MiwiZXhwIjoxNzY5NDE1MzgyfQ.3AbrVYsG3fG47CKkhjQzsH3jNwWffvECKOV9q0oe0ts",
          name: "Antique Necklace",
          description: "Heritage-inspired antique necklace",
          type: "ANTIQUE"
        },
        {
          image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/BANGLES%20(1).JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0JBTkdMRVMgKDEpLkpQRyIsImlhdCI6MTczNzg3OTM4MiwiZXhwIjoxNzY5NDE1MzgyfQ.3AbrVYsG3fG47CKkhjQzsH3jNwWffvECKOV9q0oe0ts",
          name: "Temple Jewelry Set",
          description: "Complete temple-inspired antique set",
          type: "ANTIQUE"
        }
      ]
    }
  ];

  const filterTypes = ["CHAIN", "JEWELLERY", "ANTIQUE"];

  const filteredCollections = collections.map(collection => ({
    ...collection,
    items: collection.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = !selectedFilter || item.type === selectedFilter;
      return matchesSearch && matchesFilter;
    })
  })).filter(collection => collection.items.length > 0);

  const getSimilarItems = (currentItem) => {
    return collections
      .flatMap(collection => collection.items)
      .filter(item => 
        item.type === currentItem.type && 
        item.name !== currentItem.name
      )
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen bg-burgundy">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-gold text-center mb-16">
            Our Collections
          </h1>
          
          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-gold/30 text-gold placeholder-gold/50 focus:outline-none focus:border-gold"
            />
          </div>

          {/* Filter Options */}
          <div className="flex flex-wrap gap-4 mb-12">
            {filterTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedFilter(selectedFilter === type ? '' : type)}
                className={`px-6 py-2 rounded-full border ${
                  selectedFilter === type
                    ? 'bg-gold text-burgundy border-gold'
                    : 'border-gold/30 text-gold hover:border-gold'
                } transition-colors`}
              >
                {type}
              </button>
            ))}
          </div>
          
          {filteredCollections.map((collection) => (
            <div key={collection.category} className="mb-16">
              <h2 className="font-serif text-3xl text-gold mb-8">{collection.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collection.items.map((item) => (
                  <div 
                    key={item.name} 
                    className="bg-white/5 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => setSelectedItem(item)}
                  >
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
                      <p className="text-gold/80 mb-2">{item.description}</p>
                      <span className="text-sm text-gold/60">{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-burgundy rounded-lg w-full max-w-7xl max-h-screen overflow-y-auto">
            <div className="flex flex-col md:flex-row">
              {/* Main Image Section (70% width) */}
              <div className="md:w-[70%] p-8">
                <div className="relative">
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="absolute -top-4 -right-4 bg-gold text-burgundy w-8 h-8 rounded-full flex items-center justify-center hover:bg-gold/80"
                  >
                    ×
                  </button>
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="mt-6">
                    <h2 className="font-serif text-3xl text-gold mb-3">{selectedItem.name}</h2>
                    <p className="text-gold/80 mb-3">{selectedItem.description}</p>
                    <span className="text-sm text-gold/60">{selectedItem.type}</span>
                  </div>
                </div>
              </div>

              {/* Similar Items Section (30% width) */}
              <div className="md:w-[30%] p-8 border-t md:border-l md:border-t-0 border-gold/20">
                <h3 className="font-serif text-xl text-gold mb-6">Similar Items</h3>
                <div className="space-y-6">
                  {getSimilarItems(selectedItem).map((item) => (
                    <div 
                      key={item.name}
                      className="cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="aspect-square rounded-lg overflow-hidden mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="font-serif text-gold">{item.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}