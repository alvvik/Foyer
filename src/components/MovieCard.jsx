import { useMovieContext } from "../context/MovieContext";
import { Link, Navigate } from "react-router-dom";
import { ErrorToast } from "../utils/toast";
import Modal from "./Modal";
import { useState } from "react";
import ManageWatchList from "./ManageWatchList";
import { ListPlus,Trash } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
export default function MovieCard({
  movie,
  setModelOpen,
  onClickAction = null
}) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const {user} = useAuthContext();
  async function onFavoriteClick(e) {
    try {
      e.preventDefault();
      if (favorite) removeFromFavorites(movie.id);
      else 
        addToFavorites(movie);
    } catch (error) {
      

      ErrorToast({ text: error.message });
      setModelOpen(true);
    }
  }

  return (
    <>
      <div className="group relative flex flex-col h-full overflow-hidden rounded-lg bg-background-sec text-[0.9rem] transition-transform duration-200 ease-in-out hover:-translate-y-1.25 md:text-base ">
        <div className="relative aspect-2/3 w-full">
          <img
            className="h-full w-full object-cover"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            loading="lazy"
          />

         {user && <>
          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-b from-black/10 to-black/80 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">   
            <div className="absolute top-4 right-4 flex gap-2">
            <button
              className={`flex h-8 w-8 items-center justify-center rounded-full bg-black/50 p-2 text-[1.2rem] transition-colors duration-200 hover:bg-black/80 md:h-10 md:w-10 md:text-2xl ${
                favorite ? "text-red-500" : "text-white"
              }`}
              onClick={onFavoriteClick}
            >
              ❤︎
            </button>

            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 p-2 text-white transition-colors duration-200 hover:bg-black/80 md:h-10 md:w-10"
              onClick={(e) => {
                e.preventDefault();
                setIsWatchlistOpen(true);
              }}
              aria-label="Manage watchlist"
              type="button"
            >
              <ListPlus className="h-4 w-4 md:h-5 md:w-5" />
            </button>
              {onClickAction && (
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 p-2 text-white transition-colors duration-200 hover:bg-black/80 md:h-10 md:w-10"
                  onClick={onClickAction}
                  aria-label="Remove from watchlist"
                  type="button"
                >
                  <Trash className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              )}
            </div>
            
          </div></>}
        </div>

        <div className="bg-background-sec flex flex-1 flex-col gap-2 p-3 md:p-4">
          <div>
            <h3 className="m-0 text-base font-semibold text-text">
              {movie.title}
            </h3>
            <p>{movie.release_date?.split("-")[0]}</p>
          </div>

          <div className="mt-auto flex flex-row items-center justify-around text-[0.9rem] text-yellow-300">
            <div>⭐ {movie.vote_average.toFixed(2)}</div>
            <div>
              <button className="bg-sec text-text px-3 py-1.5 rounded transition-colors hover:bg-sec/60">
                <Link to={`/movies/${movie.id}`}>See more</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        title="Manage watchlists"
        maxWidth="max-w-6xl"
      >
        <ManageWatchList
          movie={movie}
        />
      </Modal>
    </>
  );
}
