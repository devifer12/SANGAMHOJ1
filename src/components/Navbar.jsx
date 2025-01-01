export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-gold">
          <h1 className="font-serif text-xl">SANGAM</h1>
          <p className="text-xs tracking-wider">HOUSE OF JEWELS LLP</p>
        </div>
        <div className="flex gap-8 text-gold">
          <a href="#" className="border-b border-gold">Home</a>
          <a href="#" className="hover:border-b hover:border-gold">Collections</a>
          <a href="#" className="hover:border-b hover:border-gold">About</a>
          <a href="#" className="hover:border-b hover:border-gold">Contact</a>
        </div>
      </div>
    </nav>
  );
}