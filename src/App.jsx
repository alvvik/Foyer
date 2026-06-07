import "./css/App.css";
import MovieCard from "./component/MovieCard";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorites";
import Navbar from "./component/NavBar";
import { MovieProvider } from "./context/MovieContext";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <MovieProvider>
      <Navbar></Navbar>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorite />} />

          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
