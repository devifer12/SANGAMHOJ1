import { useCallback, useEffect, useState } from 'react';
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
      className="text-gold text-center relative h-20 cursor-pointer"
      onClick={handleLogoClick}
    >
      <div 
        className={`transition-all duration-500 absolute inset-0 flex flex-col justify-center z-10
          ${isScrolled ? 'translate-x-[-150%] opacity-0' : 'translate-x-0 opacity-100'}`}
      >
        <h1 className="font-serif text-2xl">SANGAM</h1>
        <p className="text-sm tracking-wider whitespace-nowrap">HOUSE OF JEWELS</p>
      </div>

      <div 
        className={`transition-all duration-500 absolute inset-0 flex items-center justify-start z-10
          ${isScrolled ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}`}
      >
        <div className="w-12 h-12">
          <img
            src="https://gkecjqzzhkihefvkvpxi.supabase.co/storage/v1/object/sign/SITE%20IMAGES/logo/Logo.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJTSVRFIElNQUdFUy9sb2dvL0xvZ28ucG5nIiwiaWF0IjoxNzM3ODc2Mzg0LCJleHAiOjE3Njk0MTIzODR9.fuC4Ve599pNpf0DGm97oXHCwwH6o74MA6KcQgnHJMA0&t=2025-01-26T07%3A26%3A24.271Z"
            alt="Sangam House of Jewels"
            className="w-full h-full object-contain"
            width={48}
            height={48}
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}