import logo from "../assets/hero.png";

export default function Navbar() {
  return (
    <div className="shadow bg-white p-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <img
          src={logo}
          alt="ZCAD"
          className="h-12"
        />
      </div>
    </div>
  );
}