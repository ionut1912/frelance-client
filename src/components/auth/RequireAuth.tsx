import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../lib/auth";

export default function RequireAuth() {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/unauthorized" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
