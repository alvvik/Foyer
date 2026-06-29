import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Check,
  ChevronDown,
  Film,
  FolderPlus,
  MoreHorizontal,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { useMovieContext } from "../context/MovieContext";

export default function ManageWatchList({
  movie = null,
  onDeleteWatchlist,
  className = "",
}) {
  const { addWatchListFilm, getWatchLists } = useMovieContext();

  const [watchLists, setWatchLists] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [activeWatchlistId, setActiveWatchlistId] = useState("");
  const [watchlistName, setWatchlistName] = useState("");
  const [watchlistDescription, setWatchlistDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Pobieranie list przy montowaniu komponentu
  const loadLists = async () => {
    const lists = await getWatchLists();
    setWatchLists(lists || []);
  };

  useEffect(() => {
    loadLists();
  }, []);

  const handleCreateWatchlist = async (e) => {
    e.preventDefault();
    if (!watchlistName.trim()) return;

    setIsSaving(true);
    try {
      await addWatchListFilm(watchlistName, watchlistDescription);
      await loadLists(); // Odśwież listę po dodaniu
      setIsCreateOpen(false);
      setWatchlistName("");
      setWatchlistDescription("");
    } catch (err) {
      console.error("Error creating watchlist:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedWatchlist = watchLists.find(
    (l) => String(l.id) === String(activeWatchlistId),
  );

  return (
    <section
      className={`rounded-3xl border border-sec/15 bg-background-sec text-text shadow-2xl shadow-black/10 ${className}`}
    >
      <div className="grid gap-6 p-6 lg:grid-cols-2">
        {/* Kolumna z listami */}
        <div className="rounded-2xl border border-sec/15 bg-background p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Your lists</h3>
              <p className="text-sm text-sec">
                Select a list to inspect contents.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-sec/20 px-3 py-2 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <FolderPlus className="h-4 w-4" /> Create
            </button>
          </div>

          <div className="space-y-3">
            {watchLists.length === 0 ? (
              <div className="p-6 text-center border border-dashed border-sec/25 rounded-2xl bg-background-sec/70">
                <p className="text-sm text-sec">
                  No watchLists yet. Create your first one!
                </p>
              </div>
            ) : (
              watchLists.map((wl) => {
                const isActive = String(wl.id) === String(activeWatchlistId);
                return (
                  <div
                    key={wl.id}
                    className={`group rounded-2xl border p-4 transition-all ${isActive ? "border-primary bg-primary/10" : "border-sec/15 bg-background-sec/60"}`}
                  >
                    <div className="flex items-start justify-between">
                      <button
                        onClick={() => setActiveWatchlistId(String(wl.id))}
                        className="text-left flex-1"
                      >
                        <h4 className="font-semibold">{wl.name}</h4>
                        <p className="text-xs text-sec">
                          {wl.description || "No description"}
                        </p>
                      </button>
                      {onDeleteWatchlist && (
                        <button
                          onClick={() => onDeleteWatchlist(wl)}
                          className="p-2 text-sec hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Kolumna szczegółów */}
        <div className="rounded-2xl border border-sec/15 bg-background p-4">
          {selectedWatchlist ? (
            <div>
              <h3 className="text-xl font-semibold">
                {selectedWatchlist.name}
              </h3>
              <p className="text-sm text-sec mt-2">
                {selectedWatchlist.description}
              </p>
              {/* Tutaj możesz wstawić logikę wyświetlania filmów z 'selectedWatchlist.movies' */}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sec">
              Select a list to view details
            </div>
          )}
        </div>
      </div>

      {/* Dialog tworzenia */}
      <Dialog
        open={isCreateOpen}
        onClose={setIsCreateOpen}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-background/70 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-3xl border border-sec/15 bg-background p-6">
            <DialogTitle className="text-xl font-semibold">
              Create a new watchlist
            </DialogTitle>
            <form onSubmit={handleCreateWatchlist} className="mt-6 space-y-4">
              <input
                value={watchlistName}
                onChange={(e) => setWatchlistName(e.target.value)}
                placeholder="Name"
                className="w-full rounded-xl border border-sec/20 p-3 bg-background-sec outline-none focus:border-primary"
              />
              <textarea
                value={watchlistDescription}
                onChange={(e) => setWatchlistDescription(e.target.value)}
                placeholder="Description"
                className="w-full rounded-xl border border-sec/20 p-3 bg-background-sec outline-none focus:border-primary"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-primary px-4 py-2 text-white font-medium"
                >
                  {isSaving ? "Saving..." : "Create"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </section>
  );
}
