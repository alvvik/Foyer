import { Link } from "react-router-dom";

import "../css/index.css";

import { useEffect, useState } from "react";
import MobileMenu from "./NavBar/MobileMenu";
import DesktopMenu from "./NavBar/DesktopMenu";
export default function Navbar() {
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
        <div className=" hidden xl:flex">
          <DesktopMenu />
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
