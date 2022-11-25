import {
  createBrowserRouter,
  // RouterProvider,
  // Route,
} from "react-router-dom";

// Import layouts
import AdminLayout from "../layouts/Admin";

import App from "../App";

const routes = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  // },
  {
    path: "/",
    element: <AdminLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
    ],
  },
]);

export default routes;
