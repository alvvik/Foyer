import { Popover } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import ThemeSwitch from "../ThemeSwitch";
import SearchBar from "../Desktop/DesktopSearchBar";
export default function MobileMenu() {
  const { user, callApiLogOut } = useAuthContext();

  return (
    <>
      <Popover
        as="nav"
        className="relative flex items-center justify-center p-4  w-full "
      >
        {({ open, close }) => (
          <>
            <Popover.Button className="md:hidden text-2xl  focus:outline-none">
              {open ? "✕" : "☰"}
            </Popover.Button>

            <Popover.Panel
              static
              as="ul"
              className={`absolute top-full rounded-2xl text-center left-0 w-full ring-1 ring-primary bg-background transition-all duration-300 md:static md:flex md:w-auto z-40 md:rounded-2xl ${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none md:pointer-events-auto md:opacity-100 md:translate-y-0"
              }`}
            >
              <li>
                <Link
                  to="/"
                  className="block p-4 hover:bg-gray-800/20"
                  onClick={() => close()}
                >
                  Home
                </Link>
              </li>
              {user && (
                <>
                  <li>
                    <Link
                      to="/settings"
                      className="block p-4 hover:bg-gray-800/20"
                      onClick={() => close()}
                    >
                      Manage account
                    </Link>
                  </li>
                </>
              )}
              <li className="flex justify-center items-center">
                <ThemeSwitch />
              </li>
              <li>
                <Link
                  to={user ? "/" : "/login"}
                  className="block p-4 hover:bg-gray-800/20"
                  onClick={() => {
                    close();
                    if (user) callApiLogOut();
                  }}
                >
                  {user ? "Log out" : "Log in"}
                </Link>
              </li>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
}
