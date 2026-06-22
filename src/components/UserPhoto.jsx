import { useAuthContext } from "../context/AuthContext";
import { getInitials } from "../utils/userUtils";
import anonymousUser from "../assets/anonymousUser.png";

export default function UserPhoto() {
  const { user, dbData } = useAuthContext();
  const initials = getInitials(dbData?.firstName, dbData?.lastName);
  const photoURL = dbData?.userPicture || user?.photoURL || anonymousUser;
  return (
    <>
      <div className="ring-2 p-2 ring-primary rounded-full overflow-hidden w-12 h-12 flex items-center justify-center">
        {photoURL ? (
          <img
            src={photoURL}
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xl font-bold text-sec ">{initials}</span>
        )}
      </div>
    </>
  );
}
