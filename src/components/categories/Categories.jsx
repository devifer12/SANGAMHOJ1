export default function Categories() {
  const categories = [
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/Necklace.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL05lY2tsYWNlLnBuZyIsImlhdCI6MTczNzgxODI3NSwiZXhwIjoxNzY5MzU0Mjc1fQ.XFYqq7bKb5C4uamrvMzFCIjtwp5NfFbs4ZXjoFEtW_E&t=2025-01-25T15%3A17%3A55.253Z",
      title: "CHAINS"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/JEWELLERY.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0pFV0VMTEVSWS5qcGciLCJpYXQiOjE3Mzc4MjYxMTcsImV4cCI6MTc2OTM2MjExN30.QNDRhVClQ79CG4SkeHUbO7x-vpzHz9syfp_2aGnflYw&t=2025-01-25T17%3A28%3A36.992Z",
      title: "JEWELLERY"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/BANGLES.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0JBTkdMRVMuSlBHIiwiaWF0IjoxNzM3ODI1ODI2LCJleHAiOjE3NjkzNjE4MjZ9.7WO4M5cB_HN7sIUsUZHHr3MR-ttv4mvgIBr4U8oMS88&t=2025-01-25T17%3A23%3A46.471Z",
      title: "BANGLES"
    }
  ];

  return (
    <div className="bg-white py-5">
      <div className="max-w-7xl mx-auto py-2 px-4 md:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-jewel-green text-center mb-16">
          EXPLORE CATEGORIES
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.title} className="group cursor-pointer relative">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-burgundy bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden">
                <h3 className="font-serif text-2xl text-gold bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{category.title}</h3>
              </div>
              <h3 className="font-serif text-2xl text-jewel-green text-center mt-4 md:hidden">{category.title}</h3>
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