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
import UserRoute from "./UserRoute";
import Wishlist from "../Pages/UserPage/WishlistPage/Wishlist";
import BookingPage from "../Pages/UserPage/BookingPage/BookingPage";
import AssignedTour from "../Pages/GuidePage/AssignedTour";
import GuideRoute from "./GuideRoute";
import CommunityPage from "../Pages/CommunityPage/CommunityPage";
import AboutPage from "../Pages/AboutPage/AboutPage";
import StoryDetails from "../Pages/StoryDetails/StoryDetails";
import TripTypePage from "../Pages/TripType/TripTypePage";
import ContactPage from "../Pages/ContactPage/ContactPage";
import BlogPage from "../Pages/BlogPage/BlogPage";
import Payment from "../Pages/UserPage/Payment/Payment";
import PaymentHistory from "../Pages/UserPage/PaymentHistory/PaymentHistory";

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
        path: "/community",
        element: <CommunityPage />,
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
        path: "/storyDetails/:id",
        element: (
          <SecureRoute>
            <StoryDetails />
          </SecureRoute>
        ),
      },
      {
        path: "/tripType/:type",
        element: (
          <SecureRoute>
            <TripTypePage />
          </SecureRoute>
        ),
      },
      {
        path: "/allGuides",
        element: <AllGuide />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/allPackages",
        element: <AllPackage />,
      },
      {
        path: "/about-us",
        element: <AboutPage />,
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
          <UserRoute>
            <RequestToAdmin />
          </UserRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <UserRoute>
            <Wishlist />
          </UserRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <UserRoute>
            <BookingPage />
          </UserRoute>
        ),
      },
      {
        path: "payment/:id",
        element: (
          <UserRoute>
            <Payment />
          </UserRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <UserRoute>
            <PaymentHistory />
          </UserRoute>
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
        loader: () => fetch(`${import.meta.env.VITE_API_URL}/usersCount`),
      },
      {
        path: "assignedTour",
        element: (
          <GuideRoute>
            <AssignedTour />
          </GuideRoute>
        ),
      },
    ],
  },
]);

export default router;
