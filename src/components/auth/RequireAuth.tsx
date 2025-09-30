import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../lib/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { routesLinks } from "../../routes/index";
import SideBarLayout from "../sidebar/SideBarLayout";

export default function RequireAuth() {
  const location = useLocation();
  const role = useSelector((state: RootState) => state.auth.role!);
  if (!isAuthenticated()) {
    return (
      <Navigate to={routesLinks.login} replace state={{ from: location }} />
    );
  }
  return (
    <>
      <SideBarLayout role={role}>
        <Outlet />
      </SideBarLayout>
    </>
  );
}
