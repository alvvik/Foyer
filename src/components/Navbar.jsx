import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import "../css/index.css";
import anonymousUser from "../assets/anonymousUser.png";
import { useEffect, useState } from "react";
import MobileMenu from "./NavBar/MobileMenu";
export default function Navbar() {
  const { user, callApiLogOut } = useAuthContext();
  const [showMoreUser, setShowMoreUser] = useState(false);

  return (
    <>
      <nav className="bg-background-sec flex items-center p-6 px-12 justify-between flex-col xl:flex-row">
        <h1 className="text-text font-bold text-5xl">
          Foyer <span className="text-primary">.</span>
        </h1>
        <div>
          <form className="hidden xl:flex items-center  bg-background rounded-full p-1 shadow-inner frame-container w-3xl ">
            <input
              type="text"
              placeholder="Search something here.."
              className="w-full bg-transparent pl-6 pr-4 py-3 text-text placeholder:text-text/60 focus:outline-none text-base md:text-lg tracking-wide"
            />
            <button
              type="submit"
              className="bg-primary/60 hover:bg-primary text-text font-medium px-8 py-3 rounded-full transition-colors duration-200 shadow-md active:scale-98 shrink-0"
            >
              Search
            </button>
          </form>
        </div>
        <div className="xl:hidden">
          <MobileMenu />
        </div>
        <div
          className=" hidden xl:flex gap-2.5 relative cursor-pointer"
          onClick={() => setShowMoreUser((prev) => !prev)}
        >
          <div>
            <span className="block ">Hello</span>
            <span className="font-bold text-xl">John Smith</span>
          </div>
          <div className="ring-4 ring-primary rounded-full">
            <img src={anonymousUser} alt="" sizes="25px" />
          </div>
          {showMoreUser && (
            <div className=" absolute top-16 z-50">
              <ul className="  ring-1 ring-primary bg-background">
                <li className="py-2 px-12 font-semibold cursor-pointer hover:bg-background-sec/50 hover:transition-all">
                  Edit profile
                </li>
                <li className="py-2 px-12 font-semibold cursor-pointer hover:bg-background-sec/50 hover:transition-all">
                  Settings
                </li>
                <li
                  onClick={() => callApiLogOut()}
                  className="py-2 px-12 font-semibold cursor-pointer hover:bg-background-sec/50 hover:transition-all"
                >
                  Log out
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      {/*  <nav className="navbar">
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
    </nav>*/}
    </>
  );
}
