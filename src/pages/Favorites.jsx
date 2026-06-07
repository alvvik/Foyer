import "../css/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../component/MovieCard";
export default function Favorites() {
  const { favorites } = useMovieContext();
  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favotites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="favorites-empty">
      <h2>No favorites Movies yet</h2>
      <p>
        Start adding movies to your favorites and they will start appear here!
      </p>
    </div>
  );
}
