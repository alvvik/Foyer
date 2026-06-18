import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import anonymousUser from "../../assets/anonymousUser.png";
import { useState } from "react";
import { LogOut, Settings } from "lucide-react";

export default function DesktopMenu() {
  const { user, callApiLogOut } = useAuthContext();
  const [showMoreUser, setShowMoreUser] = useState(false);
  const navigate = useNavigate();
 

  const handleLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Całkowita blokada bąbelkowania
    try {
      await callApiLogOut();
      setShowMoreUser(false); // Najpierw zamykamy menu
      navigate("/"); // Dopiero potem bezpiecznie przekierowujemy
    } catch (error) {
      console.error("Błąd wylogowania:", error);
    }
  };

  return user ? (
    /* Usunięto stąd onClick, żeby wnętrze menu nie triggerowało otwierania/zamykania */
    <div className="flex gap-2.5 relative">
      
      {/* Przycisk triggerujący menu - teraz klika się TYLKO w awatar i powitanie */}
      <div 
        className="flex gap-2.5 cursor-pointer"
        onClick={() => setShowMoreUser((prev) => !prev)}
      >
        <div>
          <span className="block ">Hello</span>
          <span className="font-bold text-xl">{user.displayName}</span>
        </div>
        <div className="ring-4 ring-primary rounded-full">
          <img
            src={user?.photoUrl ?? anonymousUser}
            alt={`${user.displayName} profile picture`}
            sizes="25px"
          />
        </div>
      </div>

      {showMoreUser && (
        /* Okienko menu jest teraz całkowicie niezależne */
        <div 
          className="absolute top-full right-0 mt-2 z-50" 
          onClick={(e) => e.stopPropagation()} 
        >
          <div className="rounded-2xl ring-1 bg-background ring-primary p-6">
            <div className="flex flex-col justify-center items-center" >
              <img
                src={user?.photoUrl ?? anonymousUser}
                alt={`${user.displayName} profile picture`}
                sizes="25px"
              />
              <p className="">{user.displayName}</p>
            </div>
            <hr className="text-primary ring-1 ring-primary rounded-full my-4"/>
            <ul className="mt-4">
              <li 
                className="py-2 hover:text-primary hover:scale-105 flex gap-2 active:scale-90 transition-all cursor-pointer"
                onClick={() => setShowMoreUser(false)}
              >
                <Link to="/settings">
                <Settings className="inline-block "/> Account</Link>
              </li>
              <li 
                className="py-2 hover:text-primary hover:scale-105 flex gap-2 active:scale-90 transition-all cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut /> Log out
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className=" cursor-pointer font-bold">
      <Link to="/login">Login</Link>
    </div>
  );
}