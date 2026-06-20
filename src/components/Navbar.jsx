import { Link } from "react-router-dom";

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
      <nav className="bg-background-sec  flex items-center p-6 px-12 justify-between flex-col xl:flex-row">
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
        <div className="xl:hidden w-full relative">
          <MobileMenu />
        </div>
        <div className=" hidden xl:flex">
          <DesktopMenu />
        </div>
      </nav>
      {}
    </>
  );
}
