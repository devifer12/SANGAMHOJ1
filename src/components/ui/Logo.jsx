import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      className="text-gold relative h-20 cursor-pointer"
      onClick={handleLogoClick}
    >
      {/* Desktop view - always visible */}
      <div className="hidden md:flex items-center gap-4 h-full">
        <div className="w-14 h-14 flex-shrink-0">
          <img
            src="https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/logo/Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9sb2dvL0xvZ28ucG5nIiwiaWF0IjoxNzM3ODc2Mzg0LCJleHAiOjE3Njk0MTIzODR9.fuC4Ve599pNpf0DGm97oXHCwwH6o74MA6KcQgnHJMA0&t=2025-01-26T07%3A26%3A24.271Z"
            alt="Sangam House of Jewels"
            className="w-full h-full object-contain"
            width={64}
            height={64}
            loading="eager"
          />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-serif text-4xl tracking-[0.2em] leading-none mb-2">SANGAM</h1>
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-gold"></div>
            <p className="text-[10px] tracking-[0.3em] whitespace-nowrap">HOUSE OF JEWELS</p>
            <div className="h-[1px] w-8 bg-gold"></div>
          </div>
        </div>
      </div>

      {/* Mobile view with transition */}
      <div className="block md:hidden">
        {/* Brand name that transitions out */}
        <div 
          className={`transition-all duration-500 absolute inset-0 mx-10 flex flex-col items-center justify-center z-10
            ${isScrolled ? 'translate-x-[-150%] opacity-0' : 'translate-x-0 opacity-100'}`}
        >
          <h1 className="font-serif text-3xl tracking-[0.2em] leading-none mb-2 ">SANGAM</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-[1px] w-8 bg-gold"></div>
            <p className="text-[8px] tracking-[0.3em] whitespace-nowrap">HOUSE OF JEWELS</p>
            <div className="h-[1px] w-8 bg-gold"></div>
          </div>
        </div>

        {/* Logo that transitions in */}
        <div 
          className={`transition-all duration-500 absolute inset-0 flex items-center justify-start z-10
            ${isScrolled ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}`}
        >
          <div className="w-14 h-14 flex-shrink-0 ">
            <img
              src="https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/logo/Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9sb2dvL0xvZ28ucG5nIiwiaWF0IjoxNzM3ODc2Mzg0LCJleHAiOjE3Njk0MTIzODR9.fuC4Ve599pNpf0DGm97oXHCwwH6o74MA6KcQgnHJMA0&t=2025-01-26T07%3A26%3A24.271Z"
              alt="Sangam House of Jewels"
              className="w-full h-full object-contain"
              width={64}
              height={64}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}