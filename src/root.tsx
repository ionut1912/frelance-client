import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { RootState } from "./store";
import Navbar from "./components/Navbar";

export default function RootLayout() {
  const role = useSelector((state: RootState) => state.auth.role);
  return (
    <div>
      <main>
        {role && <Navbar role={role} />}
        <Suspense fallback={<p className="p-4">Loading…</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
