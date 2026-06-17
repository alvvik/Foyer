import MovieCard from "../components/MovieCard";

import { useMovieContext } from "../context/MovieContext";
export default function Home() {
  const { movies, isLoading, error } = useMovieContext();

  
    

  return (
    <>
      <div className="bg-background ">
        {error && <div className="">{error}</div>}
        {isLoading ? (
          <div className="loading"></div>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-32 p-12">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>

      {}
    </>
  );
}
