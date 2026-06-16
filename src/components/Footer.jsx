import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className="bg-background-sec flex items-center pt-12 p-6 flex-col  justify-center  ">
        <div className="flex  justify-center items-center flex-col gap-4 lg:flex-row">
          <div className="lg:w-1/2">
            <h6 className="text-text font-bold text-3xl mb-4 text-center  lg:w-1/3">
              Foyer <span className="text-primary">.</span>
            </h6>
            <p className="lg:w-1/3 text-center ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
              a corrupti labore voluptatibus dolores? Iste debitis ratione
              laborum consequatur accusantium. Vel fugit facere quam deleniti
              accusantium deserunt amet, molestias repellendus.
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold mb-4">Useful Links</p>

            <ul className="text-center">
              <li>
                <a>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to="/favorites" className="nav-link">
                    Favorites
                  </Link>
                </a>
              </li>
              <li>
                <a>
                  <Link to="/login">Login</Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4">
          <p>&copy; {new Date().getFullYear()} Foyer. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
