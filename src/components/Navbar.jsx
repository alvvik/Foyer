import { Link } from "react-router-dom";

import "../css/index.css";

import { useEffect, useState } from "react";
import MobileMenu from "./NavBar/MobileMenu";
import DesktopMenu from "./NavBar/DesktopMenu";
import SearchBar from "./NavBar/SearchBar";
export default function Navbar({
  setSearchQuery,
  searchQuery,
  isLoading,
  setIsLoading,
}) {
  return (
    <>
      <nav className="bg-background-sec flex items-center p-6 px-12 justify-between flex-col xl:flex-row">
        <h1 className="text-text font-bold text-5xl">
          <Link to="/">
            {" "}
            Foyer <span className="text-primary">.</span>
          </Link>
        </h1>
        <div>
          <SearchBar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          ></SearchBar>
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
