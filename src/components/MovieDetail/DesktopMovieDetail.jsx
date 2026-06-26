import { log } from "firebase/firestore/pipelines";
import { Play, Star } from "lucide-react";
import Movieproviders from "./Movieproviders";
import { useMovieContext } from "../../context/MovieContext";
export default function DesktopMobileDetail({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.details.id);

  async function onFavoriteClick(e) {
    try {
      e.preventDefault();
      if (favorite) removeFromFavorites(movie.details.id);
      else addToFavorites(movie);
    } catch (error) {
      console.log(error);

      ErrorToast({ text: error.message });
      setModelOpen(true);
    }
  }
  const date = new Date(movie.details.release_date);
  const link = `https://www.youtube.com/results?search_query=trailer+${movie.details.title}`;
  const genres = movie.details?.genres?.map((g) => g.name).join(", ") || "None";

  return (
    <div>
      <div className="flex p-12 gap-6">
        <div className="w-1/2 ">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.details.poster_path}`}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-bold text-3xl ">{movie.details.title}</h1>
              <p>
                {date.getFullYear()} | {movie.details.runtime} min | {genres}
              </p>
            </div>
            <div>
              <Star className="inline mr-2" />{" "}
              {movie.details?.vote_average?.toFixed(2)} (
              {movie.details.vote_count})
            </div>
            <div className="flex gap-6">
              <a href={link}>
                <button className="bg-background-sec  px-8 py-1.5 rounded transition-all hover:bg-background-sec/60 hover:shadow-2xl hover:ring-1 hover:ring-primary">
                  <Play className="inline mr-2" /> Watch trailer
                </button>
              </a>
              <button
                className="bg-background-sec flex justify-center items-center  px-8 py-1.5 rounded transition-all hover:bg-background-sec/60 hover:shadow-2xl hover:ring-1 hover:ring-primary"
                onClick={onFavoriteClick}
              >
                <span
                  className={` text-2xl inline mr-2 ${favorite ? "text-red-500" : "text-white"}`}
                >
                  ❤︎
                </span>
                Add to favorites
              </button>
            </div>
          </div>
          <div>
            <p>{movie.details.overview}</p>
          </div>
          <div>
            <Movieproviders movie={movie.providers} />
          </div>
        </div>
      </div>
    </div>
  );
}
