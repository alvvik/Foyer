import { useParams } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { Trash, Edit } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
export default function WatchList() {
  const { WatchListName: watchlistId } = useParams();
  const navigate = useNavigate();
  const { watchlists, removeMovieFromWatchlist, deleteWatchlist } = useMovieContext();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const watchlist = watchlists.find((list) => list.id === watchlistId);

  if (!watchlist) return <div>Watchlist not found</div>;

  const handleRemoveMovie = async (movieId) => {
    await removeMovieFromWatchlist(watchlistId, movieId);
  };

  const handleDeleteWatchlist = async () => {
    await deleteWatchlist(watchlistId);
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text">{watchlist.watchListName}</h1>
          <p className="text-sec mt-2">{watchlist.watchListDesc || "No description"}</p>
          <p className="text-sec text-sm mt-1">{watchlist.movies?.length || 0} movies</p>
        </div>
        <button
          onClick={() => setIsDeleteOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-red-500/40 px-4 py-2 text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <Trash className="h-4 w-4" /> Delete List
        </button>
      </div>

      {watchlist.movies && watchlist.movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlist.movies.map((movie) => (
            <div key={movie.id} className="relative">
              <MovieCard movie={movie} onClickAction={() => handleRemoveMovie(movie.id)} />
            
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-sec/25 rounded-2xl">
          <p className="text-sec">No movies in this watchlist yet.</p>
        </div>
      )}

      <Dialog open={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-background/70 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-3xl bg-background p-6 border border-sec/15">
            <DialogTitle className="text-xl font-semibold">Delete Watchlist</DialogTitle>
            <p className="mt-4 text-sec">
              Are you sure you want to delete "{watchlist.watchListName}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 text-sm rounded-xl border border-sec/20 hover:bg-sec/10"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteWatchlist}
                className="rounded-xl bg-red-500 px-4 py-2 text-text font-medium text-sm hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
