import "./css/App.css";
import MovieCard from "./components/MovieCard";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorites";
import Navbar from "./components/Navbar";
import { MovieProvider } from "./context/MovieContext";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/MovieDetail";
import Footer from "./components/Footer";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
      <MovieProvider>
        <Navbar></Navbar>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorite />} />

            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </main>
        <Footer></Footer>
      </MovieProvider>
    </AuthProvider>
  );
}

export default App;
