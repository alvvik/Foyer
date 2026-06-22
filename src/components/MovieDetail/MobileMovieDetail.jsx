import { Play, Star } from "lucide-react";
export default function MobileMovieDetail({ movie }) {
  const rentProvider = movie.providers?.results?.US?.rent || [];
  const buyProvider = movie.providers?.results?.US?.buy || [];
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
        <div className="space-y-6 pt-12">
          <h4 className="font-bold text-lg tracking-wide">Where to watch?</h4>

          {/* RENT PROVIDERS */}
          {rentProvider.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                Rent
              </p>
              <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
                {rentProvider.map((provider) => (
                  <a
                    key={provider.provider_id || provider.id}
                    href={movie.providers.results.US.link}
                    className="flex flex-col items-center gap-1.5 shrink-0 snap-start active:scale-95 transition-transform"
                  >
                    {/* Zaokrąglone logo w stylu mobilnym */}
                    <div className="w-16 h-16 rounded-2xl bg-background-sec ring-1 ring-primary p-2.5 flex items-center justify-center shadow-sm">
                      <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    {/* Podpis pod logo */}
                    <span className="text-xs font-medium text-text truncate max-w-[64px] text-center">
                      {provider.provider_name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* BUY PROVIDERS */}
          {buyProvider.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                Buy
              </p>
              <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
                {buyProvider.map((provider) => (
                  <a
                    key={provider.provider_id || provider.id}
                    href={movie.providers.results.US.link}
                    className="flex flex-col items-center gap-1.5 shrink-0 snap-start active:scale-95 transition-transform"
                  >
                    {/* Zaokrąglone logo w stylu mobilnym */}
                    <div className="w-16 h-16 rounded-2xl bg-background-sec ring-1 ring-primary p-2.5 flex items-center justify-center shadow-sm">
                      <img
                        src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                        alt={provider.provider_name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    {/* Podpis pod logo */}
                    <span className="text-xs font-medium text-text truncate max-w-[64px] text-center">
                      {provider.provider_name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Komunikat o braku dostawców */}
          {rentProvider.length === 0 && buyProvider.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              Not available for rent or purchase in the US.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
