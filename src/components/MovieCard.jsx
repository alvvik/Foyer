import "../css/MovieCard.css";
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
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ❤︎⁠
          </button>
        </div>
      </div>
      <div className="movie-info">
        <div>
          <h3>{movie.title}</h3>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
        <div className="view-more">
          <div>⭐ {movie.vote_average.toFixed(2)}</div>
          <div>
            <button className="see-more-btn">
              {" "}
              <Link to={`/movies/${movie.id}`}>See more</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
