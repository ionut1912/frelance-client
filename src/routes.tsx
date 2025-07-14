import { createBrowserRouter, RouteObject } from "react-router-dom";
import RootLayout from "./root";


const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import("./routes/_index").then(({ default: Component }) => ({ Component })),
      },
      {
        path:'/register',
                lazy: () =>
          import("./routes/register").then(({ default: Component }) => ({ Component })),
      },
            {
        path:'/login',
                lazy: () =>
          import("./routes/login").then(({ default: Component }) => ({ Component })),
      },

    ],
  },
];

export const router = createBrowserRouter(routes);
export default routes;
