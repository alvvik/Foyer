import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import "../css/Navbar.css";
export default function Navbar() {
  const { user } = useAuthContext();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie app</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favorites" className="nav-link">
          Favorites
        </Link>
        {user ? (
          <>Logged as {user.displayName}</>
        ) : (
          <Link to="/login" className="nav-link">
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
