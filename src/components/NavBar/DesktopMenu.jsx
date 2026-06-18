import { Link, Settings } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import anonymousUser from "../../assets/anonymousUser.png";
import { useState } from "react";
import { LogOut } from "lucide-react";

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
        <img
          src={user?.photoUrl ?? anonymousUser}
          alt={`${user.displayName} profile picture`}
          sizes="25px"
        />
      </div>
      {showMoreUser && (
        <div className=" absolute top-full right-0 mt-2 z-50 "  >
          <div className="rounded-2xl ring-1 bg-background  ring-primary">
            <div>
              <img
                src={user?.photoUrl ?? anonymousUser}
                alt={`${user.displayName} profile picture`}
                sizes="25px"
              />
              <p>{user.displayName}</p>
            </div>
            <ul>
              <li>
                {" "}
                <Settings /> Account
              </li>
              <li>
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
