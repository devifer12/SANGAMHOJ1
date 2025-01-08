export default function NavLink({ href, active, children }) {
    return (
      <a 
        href={href} 
        className={`${active ? 'border-b border-gold' : 'hover:border-b hover:border-gold'}`}
      >
        {children}
      </a>
    );
  }