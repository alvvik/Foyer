import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import MobileMenu from "./NavBar/Mobile/MobileMenu";
import DesktopMenu from "./NavBar/Desktop/DesktopMenu";
import DesktopSearchbar from "./NavBar/Desktop/DesktopSearchBar";
import MobileSearchbar from "./NavBar/Mobile/MobileSearchBar";

export default function Navbar({
  setSearchQuery,
  searchQuery,
  isLoading,
  setIsLoading,
}) {
  return (
    <>
      <nav className="bg-background-sec  flex items-center p-6  px-12 justify-between flex-col lg:flex-row">
        <h1 className="text-text font-bold text-5xl">
          <Link to="/">
            {" "}
            Foyer <span className="text-primary">.</span>
          </Link>
        </h1>
        <div className="flex lg:hidden mt-4">
          <MobileSearchbar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          ></MobileSearchbar>
        </div>
        <div className="hidden lg:flex">
          <DesktopSearchbar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
          ></DesktopSearchbar>
        </div>
        <div className="lg:hidden w-full relative">
          <MobileMenu />
        </div>
        <div className=" hidden lg:flex">
          <DesktopMenu />
        </div>
      </nav>
    </>
  );
}
