export default function NavLink({ href, active, children }) {
  return (
    <a 
      href={href} 
      className={`transition-all duration-300 border-b-2 ${
        active ? 'border-gold' : 'border-transparent hover:border-gold/50'
      }`}
    >
      {children}
    </a>
  );
}