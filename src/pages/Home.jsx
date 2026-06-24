import { useState } from "react";
import MovieCard from "../components/MovieCard";

import { useMovieContext } from "../context/MovieContext";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
export default function Home() {
  const { movies, isLoading, error } = useMovieContext();
  const [isModelOpen, setModelOpen] = useState(false);

  return (
    <>
      <div className="bg-background ">
        {error && <div className="">{error}</div>}
        {isLoading ? (
          <div className="loading"></div>
        ) : (
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-32 p-12">
            {movies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                setModelOpen={setModelOpen}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModelOpen}
        onClose={() => setModelOpen(false)}
        title="Oops!"
      >
        <div className="space-y-4 ">
          <h5 className="text-center">
            You need to login to do that! <br /> Please log in or register
          </h5>

          <div className="flex justify-center">
            <Link
              to="/login"
              target="_blank"
              className="px-6 py-2 text-sm font-medium bg-primary text-text rounded shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              Go to login page
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
