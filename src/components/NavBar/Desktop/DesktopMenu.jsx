import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";

import { LogOut, Settings } from "lucide-react";
import ThemeSwitch from "../ThemeSwitch";
import UserPhoto from "../../UserPhoto";

export default function DesktopMenu() {
  const { user, callApiLogOut, dbData } = useAuthContext();
  const navigate = useNavigate();
  const displayName = dbData?.userName || user?.displayName || "User";

  const handleLogout = async (closeMenu) => {
    try {
      await callApiLogOut();
      closeMenu();
      navigate("/");
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  return user ? (
    <Popover className="relative ">
      {({ close }) => (
        <>
          <PopoverButton className="flex gap-2.5 cursor-pointer items-center select-none outline-none focus:outline-none">
            <div className="text-right">
              <span className="block text-sm opacity-80 text-left">Hello</span>
              <span className="font-bold text-xl block">
                {user.displayName}
              </span>
            </div>
            <UserPhoto />
          </PopoverButton>

          <PopoverPanel
            anchor="bottom end"
            className="mt-3 z-9999 min-w-50 rounded-2xl ring-1 bg-background text-text ring-primary p-6 shadow-xl focus:outline-none"
          >
            <div className="flex flex-col justify-center items-center gap-2">
              <UserPhoto />
              <p className="font-semibold text-center">{user.displayName}</p>
            </div>

            <hr className="border-primary opacity-30 my-4" />

            <ul className="flex flex-col gap-1">
              <li>
                <Link
                  to="/settings"
                  className="py-2 px-3 hover:text-primary hover:bg-primary/10 rounded-xl flex gap-3 items-center active:scale-95 transition-all cursor-pointer w-full"
                  onClick={() => close()}
                >
                  <Settings className="w-5 h-5" />
                  <span>Account</span>
                </Link>
              </li>

              <li>
                <div
                  role="button"
                  onClick={() => handleLogout(close)}
                  className="py-2 px-3 hover:text-primary hover:bg-primary/10 rounded-xl flex gap-3 items-center active:scale-95 transition-all cursor-pointer w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log out</span>
                </div>
              </li>
              <ThemeSwitch />
            </ul>
          </PopoverPanel>
        </>
      )}
    </Popover>
  ) : (
    <div className="cursor-pointer font-bold hover:text-primary transition-colors">
      <Link to="/login">Login</Link>
    </div>
  );
}
