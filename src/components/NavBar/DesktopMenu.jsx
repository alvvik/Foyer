import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import anonymousUser from "../../assets/anonymousUser.png";
import { useState } from "react";

export default function DesktopMenu() {
  const { user, callApiLogOut } = useAuthContext();
  const [showMoreUser, setShowMoreUser] = useState(false);
  console.log(user);

  return user ? (
    <div
      className="flex gap-2.5 relative cursor-pointer"
      onClick={() => setShowMoreUser((prev) => !prev)}
    >
      <div>
        <span className="block ">Hello</span>
        <span className="font-bold text-xl">{user.displayName}</span>
      </div>
      <div className="ring-4 ring-primary rounded-full">
        <img src={user?.photoUrl ?? anonymousUser} alt="" sizes="25px" />
      </div>
      {showMoreUser && (
        <div className=" absolute top-16 z-50">
          <ul className="  ring-1 ring-primary bg-background">
            <li className="py-2 px-12 font-semibold cursor-pointer hover:bg-background-sec/50 hover:transition-all">
              Edit profile
            </li>
            <li className="py-2 px-12 font-semibold cursor-pointer hover:bg-background-sec/50 hover:transition-all">
              Settings
            </li>
            <li className="py-2 px-12 font-semibold cursor-pointer hover:bg-background-sec/50 hover:transition-all">
              <Link
                to="/"
                onClick={() => {
                  setShowMoreUser((prev) => !prev);
                  callApiLogOut();
                }}
              >
                Log out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : (
    <div className=" cursor-pointer font-bold">
      <Link to="/login">Login</Link>
    </div>
  );
}
