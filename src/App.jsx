import "./css/index.css";
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
import { useState } from "react";
function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <AuthProvider>
        <MovieProvider>
          <div className="text-text">
            <Navbar
              setSearchQuery={setSearchQuery}
              searchQuery={searchQuery}
            ></Navbar>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorite />} />

                <Route path="/movies/:id" element={<MovieDetail />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<AuthPage />} />
              </Routes>
            </main>
            <Footer></Footer>
          </div>
        </MovieProvider>
      </AuthProvider>
    </>
  );
}

export default App;
