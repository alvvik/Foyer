import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { useMovieContext } from "../context/MovieContext";
export default function Home() {
  const { movies, isLoading, error } = useMovieContext();

  //search
  /* const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResult = await searchMovies(searchQuery);
      setMovies(searchResult);
      setError(null);
    } catch (err) {
      console.log(err);

      setError(`Failed to search movies...`);
    } finally {
      setLoading(false);
    }
  };
  */
  //call api

  return (
    <>
      <div className="bg-background ">
        {error && <div className="">{error}</div>}
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="grid grid-cols-5 gap-32 p-12">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        )}
      </div>

      {/*   <div className="home">
      <form action="" onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>*/}
    </>
  );
}
