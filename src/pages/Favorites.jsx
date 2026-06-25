import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites } = useMovieContext();
  if (favorites.length > 0) {
    return (
      <>
        <div className="bg-background ">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-32 p-12">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex justify-center flex-col gap-4  p-6">
      <h2 className="text-center font-bold text-3xl">
        No favorites Movies yet
      </h2>
      <p className="text-sec my-4 text-center lg:text-2xl">
        It looks like you haven't added any movies to your favorites yet. Start
        exploring and add your favorite picks!
      </p>
      <div className="text-center">
        <Link
          to="/"
          className="bg-primary/60 hover:bg-primary text-text font-medium px-8 py-3 rounded-full transition-colors duration-200 shadow-md active:scale-98 shrink-0"
        >
          Go back to home
        </Link>
      </div>
    </div>
  );
}
