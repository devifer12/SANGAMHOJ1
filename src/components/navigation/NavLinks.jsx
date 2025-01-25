import NavLink from './NavLink';

export default function NavLinks() {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-gold items-center">
      <NavLink href="#" active>Home</NavLink>
      <NavLink href="#">Collections</NavLink>
      <NavLink href="#">About</NavLink>
      <NavLink href="#">Contact</NavLink>
    </div>
  );
}