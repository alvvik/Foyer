import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import { callMovieDetails } from "../services/api";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

export default function MovieDetail() {
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  const galleryRef = useRef(null);

  let images = [];

  useEffect(() => {
    const getMovieDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieInfo = await callMovieDetails(id);
        setMovie(movieInfo);
      } catch (err) {
        setError("Failed...");
      } finally {
        setLoading(false);
      }
    };

    if (id) getMovieDetail();
  }, [id]);

  if (isLoading) return <div>Trwa ładowanie strony...</div>;
  if (error) return <div>Wystąpił błąd...</div>;
  if (!movie) return null;

  movie.images.backdrops.forEach((image) => {
    images = [
      ...images,
      {
        original: `https://image.tmdb.org/t/p/original/${image.file_path}`,
      },
    ];
  });
  const genresText =
    movie.details?.genres?.map((g) => g.name).join(", ") || "None";
  const link = `https://www.youtube.com/results?search_query=trailer+${movie.details.title}`;
  return (
    <div className="movie-container ">
      <div className="movie-content">
        {/* Lewa kolumna z informacjami */}
        <div className="movie-details">
          <h1 className="movie-title">{movie.details?.title}</h1>

          <div className="movie-meta">
            <span className="meta-item">
              {movie.details?.release_date?.replaceAll("-", " ")}
            </span>

            <span className="meta-item">{movie.details?.runtime} min</span>

            <span className="meta-item">{genresText}</span>
          </div>

          <div className="movie-ratings">
            <div className="rating-item">
              ⭐ {movie.details?.vote_average?.toFixed(2)}
            </div>
          </div>

          <div className="movie-actions">
            <button className="btn-watchlist">Add to watch list</button>
          </div>

          <div className="movie-sub-actions">
            <a href={link} target="_blank">
              <button className="sub-action-btn">
                <div className="sub-icon-container">🎬</div>
                <span>Watch Trailer</span>
              </button>
            </a>

            <button className="sub-action-btn">
              <div className="sub-icon-container">✔️</div>
              <span>I have seen this before</span>
            </button>

            <button
              className="sub-action-btn"
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
              }}
            >
              <div className="sub-icon-container">📤</div>
              <span>Share This Movie</span>
            </button>
          </div>

          <p className="movie-description">{movie.details?.overview}</p>
        </div>

        {/* Prawa kolumna ze zdjęciem */}
        <div className="movie-media">
          <div className="card-image">
            <ImageGallery ref={galleryRef} items={images} />
          </div>
        </div>
      </div>
      <div className="actors-div">
        <div className="actor-card"></div>
      </div>
    </div>
  );
}
