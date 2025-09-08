import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./root";
import Spinner from "./components/Spinner";
import ErrorBoundary from "./components/errors/ErrorBoundary";

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    hydrateFallbackElement: <Spinner />,
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
      {
        path: "*",
        lazy: () =>
          import("./routes/not-found").then(({ default: Component }) => ({
            Component,
          })),
      },
      {
        path: "/unauthorized",
        lazy: () =>
          import("./routes/unauthorized").then(({ default: Component }) => ({
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
