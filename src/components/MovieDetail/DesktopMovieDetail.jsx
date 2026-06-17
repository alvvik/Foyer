import { Play, Star } from "lucide-react";
export default function DesktopMobileDetail({ movie }) {
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
  const genres =
    movie.details?.genres?.map((g) => g.name).join(", ") || "None";
  return (
    <div>
        <div className="flex p-12 gap-6">
                <div className="w-1/2 ">
                    <img src={`https://image.tmdb.org/t/p/original/${movie.details.poster_path}`} alt=""  />
                </div>
               <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                     <div>
                    <h1 className="font-bold text-3xl ">{movie.details.title}</h1>
                    <p>{date.getFullYear()} |  {movie.details.runtime} min | {genres}</p>
                </div>
                <div>
                 
                <Star className="inline mr-2"/>    {movie.details?.vote_average?.toFixed(2)} (
            {movie.details.vote_count})
       
                </div>
                <div className="flex gap-6">
                    <a href={link}>
                        <button className="bg-background-sec  px-8 py-1.5 rounded transition-all hover:bg-background-sec/60 hover:shadow-2xl hover:ring-1 hover:ring-primary">
                        <Play className="inline mr-2"/> Watch trailer
            </button>
                    </a>
                    <button className="bg-background-sec  px-8 py-1.5 rounded transition-all hover:bg-background-sec/60 hover:shadow-2xl hover:ring-1 hover:ring-primary">
                        <Star className="inline mr-2"/> Add to favorites
            </button>
                </div>
                </div>
                <div>
                    <p>
                        {movie.details.overview}
                    </p>
                </div>
                {}
<div className="mt-6">
  <h4 className="font-bold text-lg mb-4 text-gray-200">Where to watch?</h4>

  {}
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-3xl">
    {providers.map((provider) => (
      <a
        key={provider.name}
        href={provider.url}
        className="group flex items-center gap-3 bg-background-sec/40 border border-white/10 rounded-xl p-3 transition-all hover:bg-background-sec/80 hover:border-primary hover:shadow-lg hover:shadow-primary/5 active:scale-95"
      >
        {}
        <div className="w-10 h-10 rounded-lg bg-black/20 p-1.5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-black/40 transition-colors">
          <img
            src={provider.logo}
            alt={provider.name}
            className="max-w-full max-h-full object-contain transition-transform group-hover:scale-105"
          />
        </div>
        
        {}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold  transition-colors truncate">
            {provider.name}
          </span>
          <span className="text-[11px] text-primary font-medium tracking-wide uppercase opacity-80 group-hover:opacity-100 transition-opacity">
            Stream
          </span>
        </div>
      </a>
    ))}
  </div>
</div>
               </div>
        </div>
    </div>
  );
}
