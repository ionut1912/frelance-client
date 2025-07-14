import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <main className="flex-1 container mx-auto px-6 py-8">
        <Suspense fallback={<p className="p-4">Loading…</p>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
