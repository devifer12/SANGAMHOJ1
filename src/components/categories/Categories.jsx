export default function Categories() {
  const categories = [
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/Necklace.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL05lY2tsYWNlLnBuZyIsImlhdCI6MTczNzg3NjMyMSwiZXhwIjoxNzY5NDEyMzIxfQ.l3f6VBSgKQj138E5i_j7byjQ5R4tP_I4vhRMiDxgKWg&t=2025-01-26T07%3A25%3A21.096Z",
      title: "CHAINS"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/JEWELLERY.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0pFV0VMTEVSWS5qcGciLCJpYXQiOjE3Mzc4NzYyNzUsImV4cCI6MTc2OTQxMjI3NX0.-riiIje25Nrt_G5OWmJvQffjBDBO6upbYWhNz-8MpD0&t=2025-01-26T07%3A24%3A35.131Z",
      title: "JEWELLERY"
    },
    {
      image: "https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/OUR%20COLLECTIONS/Explore%20coll/BANGLES.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9PVVIgQ09MTEVDVElPTlMvRXhwbG9yZSBjb2xsL0JBTkdMRVMuSlBHIiwiaWF0IjoxNzM3ODc2MzQ5LCJleHAiOjE3Njk0MTIzNDl9.6ZwxPoIJJP5TTxkSM1H17jGaAbkk_544L98d0Psn5l4&t=2025-01-26T07%3A25%3A49.020Z",
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
                  loading="lazy"
                  width={400}
                  height={400}
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