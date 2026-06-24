import { Play, Star } from "lucide-react";
import Movieproviders from "./Movieproviders";
export default function MobileMovieDetail({ movie }) {
  const date = new Date(movie.details.release_date);
  const link = `https://www.youtube.com/results?search_query=trailer+${movie.details.title}`;
  return (
    <div>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://image.tmdb.org/t/p/w500/${movie.details.backdrop_path})`,
        }}
        className="bg-cover bg-center bg-no-repeat min-h-96 flex flex-col justify-around "
      >
        <div className="flex justify-center mt-24">
          <a href={link}>
            <div className="w-14 h-14 bg-background-sec rounded-full flex justify-center items-center ring-1 ring-primary  hover:scale-105 hover:transition-all hover:-translate-y-2.5 hover:shadow-2xl ">
              <Play className="text-primary" />
            </div>
          </a>
        </div>
        <div className="flex justify-center flex-col m-4">
          <h1 className="font-bold text-3xl">{movie.details.title}</h1>
          <p>
            {" "}
            {date.getFullYear()} | {movie.details.runtime} min
          </p>
          <p>
            <Star className="text-yellow-300 inline-block" />{" "}
            {movie.details?.vote_average?.toFixed(2)} (
            {movie.details.vote_count})
          </p>
        </div>
      </div>
      <div className="p-8">
        <img
          src={`https://image.tmdb.org/t/p/w154/${movie.details.poster_path}`}
          alt=""
          className="float-left mr-4 rounded"
        />
        <p>{movie.details.overview}</p>
      </div>
      <div>
        <Movieproviders movie={movie.providers} />
      </div>
    </div>
  );
}
