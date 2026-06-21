import { useState } from "react";
import { Search, X } from "lucide-react";
import { useMovieContext } from "../../../context/MovieContext";

export default function MobileSearchbar({ setSearchQuery, searchQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchMoviesByQuery } = useMovieContext();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    fetchMoviesByQuery(searchQuery);
    setIsOpen(false); // Zamyka po wyszukaniu
  };

  return (
    <div className="flex items-center justify-end">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full  text-text"
        >
          <Search className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-background rounded-full p-1 shadow-lg border border-primary"
        >
          <input
            type="text"
            autoFocus
            placeholder="Search..."
            className="w-full bg-transparent pl-4 py-2 text-text focus:outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          />

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-2 text-text/60 hover:text-text"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            type="submit"
            className="bg-primary px-4 py-2 rounded-full text-text font-medium"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
}
