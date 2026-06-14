import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <nav className="relative flex items-center justify-between p-4 ">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <span
          className={`h-1 w-full bg-white rounded transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`h-1 w-full bg-white rounded transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`h-1 w-full bg-white rounded transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Nav Links */}
      <ul
        className={`md:flex md:space-x-4 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent flex-col md:flex-row items-center transition-all duration-300 ease-in-out ${isOpen ? "max-h-60 opacity-100" : "max-h-0 md:max-h-full opacity-0 md:opacity-100 overflow-hidden md:overflow-visible"}`}
      >
        <li className="py-2 md:py-0">
          <a href="#home" className="hover:text-gray-300">
            Home
          </a>
        </li>
        <li className="py-2 md:py-0">
          <a href="#about" className="hover:text-gray-300">
            About
          </a>
        </li>
        <li className="py-2 md:py-0">
          <a href="#contact" className="hover:text-gray-300">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
}
