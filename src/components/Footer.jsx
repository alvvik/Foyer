import "../css/Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className="bg-background-sec flex items-center pt-12 p-6 flex-col  justify-center  ">
        <div className="flex  justify-around items-center">
          <div className="w-1/2">
            <h6 className="text-text font-bold text-3xl mb-4">
              Foyer <span className="text-primary">.</span>
            </h6>
            <p className="w-1/3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
              a corrupti labore voluptatibus dolores? Iste debitis ratione
              laborum consequatur accusantium. Vel fugit facere quam deleniti
              accusantium deserunt amet, molestias repellendus.
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold mb-4">Useful Links</p>

            <ul>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="nav-link">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4">
          <p>&copy; {new Date().getFullYear()} Foyer. All rights reserved.</p>
        </div>
      </footer>
      {/*  <footer className="movie-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span>Movie app</span>
        </div>

        <ul className="footer-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#favorites">Favorites</a>
          </li>
          <li>
            <a href="#login">Log in</a>
          </li>
          <li>
            <a href="#privacy">Privacy Policy</a>
          </li>
        </ul>

        <div className="footer-socials">
          <a
            href="https://github.com/alvvik"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            <span>GitHub</span>
          </a>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Movie app. All rights reserved.
          </p>
        </div>
      </div>
    </footer>*/}
    </>
  );
}
