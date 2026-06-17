import { useMovieContext } from "../context/MovieContext";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-lg bg-[#1a1a1a] text-[0.9rem] transition-transform duration-200 ease-in-out hover:-translate-y-[5px] md:text-base">
    
      <div className="relative aspect-[2/3] w-full">
        <img
          className="h-full w-full object-cover"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />

   
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-b from-black/10 to-black/80 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <button
            className={`absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 p-2 text-[1.2rem] transition-colors duration-200 hover:bg-black/80 md:h-10 md:w-10 md:text-2xl ${
              favorite ? "text-red-500" : "text-white"
            }`}
            onClick={onFavoriteClick}
          >
            ❤︎
          </button>
        </div>
      </div>

    
      <div className="bg-background-sec flex flex-1 flex-col gap-2 p-3 md:p-4">
        <div>
          <h3 className="m-0 text-base font-semibold text-text">
            {movie.title}
          </h3>
          <p>
            {movie.release_date?.split("-")[0]}
          </p>
        </div>

       
        <div className="mt-auto flex flex-row items-center justify-around text-[0.9rem] text-yellow-300">
          <div>⭐ {movie.vote_average.toFixed(2)}</div>
          <div>
            <button className="bg-background-sec text-white px-3 py-1.5 rounded transition-colors hover:bg-background-sec/60">
              <Link to={`/movies/${movie.id}`}>See more</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
