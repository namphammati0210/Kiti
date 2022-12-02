import {
  createBrowserRouter,
  // RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Import layouts
import AdminLayout from "../layouts/Admin";
import AuthLayout from "../layouts/Auth";

// Import Views
import App from "../App";
import Landing from "../views/Landing";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";
import Dashboard from "../views/admin/Dashboard";
import CampaignCreationForm from "../components/Campaigns/CampaignCreationForm";

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

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="/app" element={<AdminLayout />}>
        <Route path="" element={<App />} />
        <Route path="campaign/new" element={<CampaignCreationForm />} />
      </Route>
    </>
  )
);

export default routes;
