import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import SecureRoute from "./SecureRoute";
import AddPackage from "../Pages/AdminPage/AddPackage/AddPackage";
import ManagePackages from "../Pages/AdminPage/ManagePackages/ManagePackages";
import ManageUsers from "../Pages/AdminPage/ManageUsers/ManageUsers";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import UpdatePackage from "../Pages/AdminPage/UpdatePackage/UpdatePackage";
import Profile from "../Pages/Profile/Profile";
import AdminRoute from "./AdminRoute";
import GuideDetails from "../Pages/GuideDetails/GuideDetails";
import AllGuide from "../Pages/AllGuide.jsx/AllGuide";
import AllPackage from "../Pages/AllPackage.jsx/AllPackage";
import RequestToAdmin from "../Pages/UserPage/RequestToAdmin/RequestToAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/packageDetails/:id",
        element: (
          <SecureRoute>
            <PackageDetails />
          </SecureRoute>
        ),
      },
      {
        path: "/guideDetails/:id",
        element: (
          <SecureRoute>
            <GuideDetails />
          </SecureRoute>
        ),
      },
      {
        path: "/allGuides",
        element: <AllGuide />,
      },
      {
        path: "/allPackages",
        element: <AllPackage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <SecureRoute>
        <DashboardLayout />
      </SecureRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <SecureRoute>
            <Profile />
          </SecureRoute>
        ),
      },
      {
        path: "requestToAdmin",
        element: (
          <SecureRoute>
            <RequestToAdmin />
          </SecureRoute>
        ),
      },
      {
        path: "addPackage",
        element: (
          <AdminRoute>
            <AddPackage />
          </AdminRoute>
        ),
      },
      {
        path: "updatePackage/:id",
        element: (
          <AdminRoute>
            <UpdatePackage />
          </AdminRoute>
        ),
      },
      {
        path: "managePackages",
        element: (
          <AdminRoute>
            <ManagePackages />
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
