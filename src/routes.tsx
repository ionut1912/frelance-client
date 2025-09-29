import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./root";
import Spinner from "./components/Spinner";
import ErrorBoundary from "./components/errors/ErrorBoundary";
import RequireAuth from "./components/auth/RequireAuth";

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
        path: "/remote-capture",
        lazy: () =>
          import("./routes/mobileCameraCapture").then(
            ({ default: Component }) => ({
              Component,
            }),
          ),
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
  {
    element: <RequireAuth />,
    errorElement: <ErrorBoundary />,
    hydrateFallbackElement: <Spinner />,
    children: [
      {
        path: "/client",
        lazy: () =>
          import("./routes/clientProfile").then(({ default: Component }) => ({
            Component,
          })),
      },
      {
        path: "/freelancer",
        lazy: () =>
          import("./routes/freelancerProfile").then(
            ({ default: Component }) => ({
              Component,
            }),
          ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  future: { v7_partialHydration: true },
});

export default routes;
