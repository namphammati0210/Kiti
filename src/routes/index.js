import {
  createBrowserRouter,
  // RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Import layouts
import AdminLayout from "../layouts/Admin";

// Import Views
import App from "../App";
import Landing from "../views/Landing";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Landing />,
//   },
//   {
//     path: "/admin",
//     element: <AdminLayout />,
//     // errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <App />,
//       },
//     ],
//   },
// ]);

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="" element={<App />} />
      </Route>
    </>
  )
);

export default routes;
