import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, callApiLogOut } = useAuthContext();
  return (
    <nav className="relative flex items-center justify-between p-4  w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-2xl z-50"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <ul
        className={`absolute top-full left-0 w-full bg-background transition-all duration-300 md:static md:flex md:w-auto z-40 ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none md:pointer-events-auto md:opacity-100 md:translate-y-0"
        }`}
      >
        <li>
          <Link
            to="/"
            className="block p-4 hover:bg-gray-800/20"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            className="block p-4 hover:bg-gray-800/20"
            onClick={() => setIsOpen(false)}
          >
            Favorites
          </Link>
        </li>

        <li>
          <Link
            to={user ? "/" : "/login"}
            className="block p-4 hover:bg-gray-800/20"
            onClick={() => {
              setIsOpen(false);
              if (user) callApiLogOut();
            }}
          >
            {user ? "Log out" : "Log in"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
