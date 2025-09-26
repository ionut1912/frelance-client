import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../lib/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Navbar from "../Navbar";

export default function RequireAuth() {
  const location = useLocation();
  const role = useSelector((state: RootState) => state.auth.role!);
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return (
    <>
      <Navbar role={role} />
      <Outlet />
    </>
  );
}
