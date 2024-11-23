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
        element: <PackageDetails />,
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
        path: "addPackage",
        element: (
          <SecureRoute>
            <AddPackage />
          </SecureRoute>
        ),
      },
      {
        path: "updatePackage/:id",
        element: (
          <SecureRoute>
            <UpdatePackage />
          </SecureRoute>
        ),
      },
      {
        path: "managePackages",
        element: (
          <SecureRoute>
            <ManagePackages />
          </SecureRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <SecureRoute>
            <ManageUsers />
          </SecureRoute>
        ),
      },
    ],
  },
]);

export default router;
