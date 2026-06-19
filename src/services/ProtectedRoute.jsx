import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
export default function ProtectedRoute() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <div className="p-6 text-center text-sec">Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace={true} />;
}
