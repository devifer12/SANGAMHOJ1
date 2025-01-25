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
    <div className="text-gold text-center relative h-32">
      {/* Brand Name */}
      <div 
        className={`transition-all duration-500 absolute inset-0 flex flex-col justify-center
          ${isScrolled ? 'translate-x-[-150%] opacity-0' : 'translate-x-0 opacity-100'}`}
      >
        <h1 className="font-serif text-2xl md:text-3xl">SANGAM</h1>
        <p className="text-base md:text-lg tracking-wider whitespace-nowrap">HOUSE OF JEWELS</p>
      </div>

      {/* Logo */}
      <div 
        className={`transition-all duration-500 absolute inset-0 flex items-center justify-center
          ${isScrolled ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}`}
      >
        <div className="w-16 h-16 ">
          <img src="https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/logo/Screenshot_2025-01-25_145832-ai-brush-removebg-kxbboj2q.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9sb2dvL1NjcmVlbnNob3RfMjAyNS0wMS0yNV8xNDU4MzItYWktYnJ1c2gtcmVtb3ZlYmcta3hiYm9qMnEucG5nIiwiaWF0IjoxNzM3ODA4MTExLCJleHAiOjE3NjkzNDQxMTF9.FflGuqN9Zwrvg0JkO87aZ-r7HYhn2BWEoMH6lK6pSeo&t=2025-01-25T12%3A28%3A31.187Z"

             alt="Sangam House of Jewels"
             className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}    