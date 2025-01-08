export default function Button({ children, className = '', ...props }) {
    return (
      <button 
        className={`border border-gold text-gold px-6 md:px-8 py-2 md:py-3 text-sm md:text-base hover:bg-gold hover:text-jewel-green transition-colors ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }