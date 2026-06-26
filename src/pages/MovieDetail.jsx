import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import { callMovieDetails } from "../services/api";

import MobileMovieDetail from "../components/MovieDetail/MobileMovieDetail";
import DesktopMobileDetail from "../components/MovieDetail/DesktopMovieDetail";

export default function MovieDetail() {
  const { id } = useParams();

  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);

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
