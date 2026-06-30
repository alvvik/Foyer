import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FolderPlus, ArrowUpRight, Trash, Check, Plus } from "lucide-react";
import { useMovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

export default function ManageWatchList({ movie }) {
  
  const { watchlists, createWatchlist, addMovieToWatchlist, removeMovieFromWatchlist, deleteWatchlist } = useMovieContext();
  const navigate = useNavigate();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [watchListName, setWatchListName] = useState("");
  const [watchListDescription, setWatchListDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!watchListName.trim()) return;

    await createWatchlist(watchListName, watchListDescription);
    
   
    setWatchListName("");
    setWatchListDescription("");
    setIsCreateOpen(false);
  };

  const isMovieInWatchlist = (watchlist) => {
    return watchlist.movies && watchlist.movies.some((m) => m.id === movie.id);
  };

  const handleToggleMovie = async (watchlist) => {
    if (isMovieInWatchlist(watchlist)) {
      await removeMovieFromWatchlist(watchlist.id, movie.id);
    } else {
      await addMovieToWatchlist(watchlist.id, movie);
    }
  };

  const handleDeleteWatchlist = async (watchlistId) => {
    if (confirm("Are you sure you want to delete this watchlist?")) {
      await deleteWatchlist(watchlistId);
    }
  };
  
  return (
    <section className="rounded-3xl ring ring-sec/15 bg-background-sec p-6 text-text shadow-2xl">
      <div className="flex items-center justify-between flex-col md:grid md:grid-cols-2 gap-4">

  <div className="flex items-center justify-between flex-col gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Your lists</h3>
          <p className="text-sm text-sec">Manage your custom movie collections.</p>
        </div>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl ring ring-sec/20 px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <FolderPlus className="h-4 w-4" /> Create List
        </button>
      </div>

     
      <div className="space-y-3">
        {watchlists.length === 0 ? (
          <p className="text-sm text-sec text-center py-6 ring ring-dashed ring-sec/25 rounded-2xl">
            No watchlists yet. Create your first one!
          </p>
        ) : (
          watchlists.map((list) => (
            <div key={list.id} className="p-4 rounded-2xl ring ring-primary/20 bg-primary/5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold">{list.watchListName || "There is no name"}</h4>
                  <p className="text-xs text-sec">{list.watchListDesc || "No description"}</p>
                  <p className="text-xs text-sec mt-1">{list.movies?.length || 0} movies</p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => handleToggleMovie(list)}
                    className={`flex justify-center items-center rounded-full p-2 hover:scale-105 active:scale-95 transition-all hover:cursor-pointer ${
                      isMovieInWatchlist(list)
                        ? "bg-primary text-white"
                        : "ring-1 ring-primary/40 text-text"
                    }`}
                    title={isMovieInWatchlist(list) ? "Remove from watchlist" : "Add to watchlist"}
                  >
                    {isMovieInWatchlist(list) ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => navigate(`/watchlist/${list.id}`)}
                    className="flex justify-center items-center ring-1 ring-primary/40 rounded-full text-text p-2 hover:scale-105 active:scale-95 transition-all hover:cursor-pointer"
                    title="View watchlist"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteWatchlist(list.id)}
                    className="flex justify-center items-center ring-1 ring-red-500/40 rounded-full text-red-500 p-2 hover:scale-105 active:scale-95 transition-all hover:cursor-pointer"
                    title="Delete watchlist"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>


      </div>

      <Dialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} className="relative z-50 text-text">
        <DialogBackdrop className="fixed inset-0 bg-background/70 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-3xl bg-background p-6 ring ring-sec/15">
            <DialogTitle className="text-xl font-semibold">Create a new watchlist</DialogTitle>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                value={watchListName}
                onChange={(e) => setWatchListName(e.target.value)}
                placeholder="List Name"
                className="w-full rounded-xl  p-3 bg-background-sec outline-none focus:ring focus:ring-primary"
                required
              />
              <textarea
                value={watchListDescription}
                onChange={(e) => setWatchListDescription(e.target.value)}
                placeholder="Description (optional)"
                className="w-full rounded-xl  p-3 bg-background-sec outline-none focus:ring focus:ring-primary"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsCreateOpen(false)} className="rounded-xl bg-red-500 px-4 py-2 text-text font-medium text-sm hover:scale-105 active:scale-95 transition-all">
                  Cancel
                </button>
                <button type="submit" className="rounded-xl bg-primary px-4 py-2 text-text font-medium text-sm hover:scale-105 active:scale-95 transition-all">
                  Create
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
}