import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import "../css/Navbar.css";
import anonymousUser from "../assets/anonymousUser.png";
import { useEffect, useState } from "react";
export default function Navbar() {
  const { user, callApiLogOut } = useAuthContext();
  const [showMoreUser, setShowMoreUser] = useState(false);

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
          <>
            <div
              className="nav-user"
              onClick={() => setShowMoreUser((prev) => !prev)}
            >
              <img src={anonymousUser} alt={user.displayName} width="25px" />
              <p className="nav-userName">{user.displayName}</p>
              {showMoreUser && (
                <div className="showMoreUser">
                  <ul className="showMoreUserList">
                    <li>Edit Profile</li>
                    <li>Settings</li>
                    <li onClick={() => callApiLogOut()}>Log out</li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="nav-link">
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}
