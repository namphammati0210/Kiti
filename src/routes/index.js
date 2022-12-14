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
import CampaignsDetails from "../components/Campaigns/CampaignDetails";
import CampaignRequesting from "../components/Campaigns/request/CampaignRequesting";
import RequestForm from "../components/Campaigns/request/RequestForm";

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
        <Route path="campaign/:campaignId" element={<CampaignsDetails />} />
        <Route
          path="campaign/:campaignId/requests"
          element={<CampaignRequesting />}
        />
        <Route
          path="campaign/:campaignId/requests/new"
          element={<RequestForm />}
        />
      </Route>
    </>
  )
);

export default routes;
