export default function Movieproviders({ movie }) {
  const rentProvider = movie?.results?.US?.rent || [];
  const buyProvider = movie?.results?.US?.buy || [];
  console.log(rentProvider, buyProvider);

  return (
    <div className="p-4">
      <h4 className="font-bold text-lg tracking-wide">Where to watch?</h4>

      {rentProvider.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
            Rent
          </p>
          <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
            {rentProvider.map((provider) => (
              <a
                key={provider.provider_id || provider.id}
                href={movie.results.US.link}
                className="flex flex-col items-center gap-1.5 shrink-0 snap-start active:scale-95 transition-all hover:scale-105"
              >
                <div className="w-16 h-16 rounded-2xl bg-background-sec ring-1 ring-primary p-2.5 flex items-center justify-center shadow-sm">
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="max-w-full max-h-full object-contain rounded-2xl"
                  />
                </div>

                <span className="text-xs font-medium text-text truncate max-w-28 text-center">
                  {provider.provider_name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {buyProvider.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
            Buy
          </p>
          <div className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2">
            {buyProvider.map((provider) => (
              <a
                key={provider.provider_id || provider.id}
                href={movie.results.US.link}
                className="flex flex-col items-center gap-1.5 shrink-0 snap-start active:scale-95 transition-all hover:scale-105"
              >
                <div className="w-16 h-16 rounded-2xl bg-background-sec ring-1 ring-primary p-2.5 flex items-center justify-center shadow-sm">
                  <img
                    src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="max-w-full max-h-full object-contain rounded-2xl"
                  />
                </div>

                <span className="text-xs font-medium text-text truncate max-w-28 text-center">
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
  );
}
