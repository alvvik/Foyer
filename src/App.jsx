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
import Settings from "./pages/Settings";
import ProtectedRoute from "./services/ProtectedRoute";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { ToastContainer } from "react-toastify";
import WatchList from "./pages/WatchList";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isDarkMode } = useThemeContext();
  return (
    <>
      <AuthProvider>
        <MovieProvider>
          <div className={`text-text bg-background min-h-screen relative `}>
            <div className="sticky top-0 z-50">
              <Navbar
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              ></Navbar>
            </div>
            <main>
              <ToastContainer />
              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/movies/:id" element={<MovieDetail />} />
                <Route
                  path="/watchlist/:WatchListName"
                  element={<WatchList />}
                />
                <Route path="*" element={<NotFound />} />
                <Route path="/login" element={<AuthPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/favorites" element={<Favorite />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
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
