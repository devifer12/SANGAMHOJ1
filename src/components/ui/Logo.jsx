import { useEffect, useState } from 'react';

export default function Logo() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Set initial scroll state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="text-gold text-center relative h-20">
      {/* Brand Name */}
      <div 
        className={`transition-all duration-500 absolute inset-0 flex flex-col justify-center
          ${isScrolled ? 'translate-x-[-150%] opacity-0' : 'translate-x-0 opacity-100'}`}
      >
        <h1 className="font-serif text-2xl">SANGAM</h1>
        <p className="text-sm tracking-wider whitespace-nowrap">HOUSE OF JEWELS</p>
      </div>

      {/* Logo */}
      <div 
        className={`transition-all duration-500 absolute inset-0 flex items-center justify-center
          ${isScrolled ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}`}
      >
        <div className="w-12 h-12">
          <img
            src="https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/logo/Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9sb2dvL0xvZ28ucG5nIiwiaWF0IjoxNzM3ODcyMzAwLCJleHAiOjE3Njk0MDgzMDB9.gFxvyX6TpeWZQ8b5HEadwhRyQqGOv0KaiLFSDSSf4MQ&t=2025-01-26T06%3A18%3A20.244Z"
            alt="Sangam House of Jewels"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}