import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import { callMovieDetails } from "../services/api";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";
import MobileMovieDetail from "../components/MovieDetail/MobileMovieDetail";
import DesktopMobileDetail from "../components/MovieDetail/DesktopMovieDetail";

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
  console.log(movie);
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
    <div className="bg-background">
      <div className="block lg:hidden">
        <MobileMovieDetail movie={movie} />
      </div>

      <div className="hidden lg:block">
        <DesktopMobileDetail movie={movie} />
      </div>
    </div>
  );
}
