import NavLink from './NavLink';

export default function NavLinks() {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-gold w-full md:w-auto items-center">
      <NavLink href="#" active>Home</NavLink>
      <NavLink href="#">Collections</NavLink>
      <NavLink href="#">About</NavLink>
      <NavLink href="#">Contact</NavLink>
    </div>
  );
}