import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Search, X } from "lucide-react";
import { useMovieContext } from "../../../context/MovieContext";
export default function DesktopSearchBar({
  setSearchQuery,

  searchQuery,
}) {
  const { fetchMoviesByQuery } = useMovieContext();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    fetchMoviesByQuery(searchQuery);
  };

  return (
    <form
      onSubmit={handleSearch}
      className=" flex items-center  bg-background rounded-full p-1 shadow-inner frame-container xl:w-3xl sm:w-xl"
    >
      <input
        type="text"
        placeholder="Search something here.."
        className="w-full bg-transparent pl-6 pr-4 py-3 text-text placeholder:text-text/60 focus:outline-none text-base md:text-lg tracking-wide"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />

      <button
        type="submit"
        className="bg-primary/60 hover:bg-primary text-text font-medium px-8 py-3 rounded-full transition-colors duration-200 shadow-md active:scale-98 shrink-0"
      >
        Search
      </button>
    </form>
  );
}
