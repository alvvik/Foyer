import { Play, Star } from "lucide-react";
export default function MobileMovieDetail({ movie }) {
  const providers = [
    {
      name: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Netflix_2016_N_logo.svg",
      url: "#",
    },
    {
      name: "Max",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg",
      url: "#",
    },
    {
      name: "Disney+",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
      url: "#",
    },
    {
      name: "Prime Video",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg",
      url: "#",
    },
    {
      name: "Apple TV",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg",
      url: "#",
    },
  ];
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
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w154/${movie.details.poster_path}`}
            alt=""
            className="float-left mr-4 rounded"
          />
          <p>{movie.details.overview}</p>
        </div>
        <div className="space-y-3 pt-12">
          <h4 className="font-bold text-lg tracking-wide">Where to watch?</h4>

          {}
          <div className="flex gap-4 overflow-x-auto  scrollbar-none snap-x snap-mandatory py-2">
            {providers.map((provider) => (
              <a
                key={provider.name}
                href={provider.url}
                className="flex flex-col items-center gap-1.5 shrink-0 snap-start active:scale-95 transition-transform"
              >
                {}
                <div className="w-16 h-16 rounded-2xl bg-background-sec ring-1 ring-primary p-2.5 flex items-center justify-center shadow-sm">
                  <img
                    src={provider.logo}
                    alt={provider.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                {}
                <span className="text-xs font-medium text-text truncate max-w-[64px] text-center">
                  {provider.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
