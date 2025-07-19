// routes.tsx
import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./root";
import Spinner from "./components/Spinner"; // ⬅️ tiny loader component

const routes: RouteObject[] = [
  {
    element: <RootLayout />,

    hydrateFallbackElement: <Spinner />, // ⬅️ new line
    children: [
      {
        index: true,
        lazy: () =>
          import("./routes/_index").then(({ default: Component }) => ({
            Component,
          })),
      },
      {
        path: "/register",
        lazy: () =>
          import("./routes/register").then(({ default: Component }) => ({
            Component,
          })),
      },
      {
        path: "/login",
        lazy: () =>
          import("./routes/login").then(({ default: Component }) => ({
            Component,
          })),
      },
    ],
  },
];

// turn on the experimental feature so RR knows we intend to hydrate gradually
export const router = createBrowserRouter(routes, {
  future: { v7_partialHydration: true },
});

export default routes;
