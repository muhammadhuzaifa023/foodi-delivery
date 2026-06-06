import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Shop/Menu";
import SignUp from "../components/Navbar/SignUp";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/Shop/CartPage";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Navbar/Login";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/Shop/Payment";
import Order from "../pages/dashboard/Order";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import OrderTracking from "../pages/Shop/OrderTracking";
import CustomerSupport from "../pages/Contact/CustomerSupport";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/order",
        element: <Order />,
      },
      {
        path: "/order-tracking",
        element: <OrderTracking />,
      },
      {
        path: "/customer-support",
        element: <CustomerSupport />,
      },
      {
        path: "/process-checkout",
        element: <Payment />,
      },
      {
        path: "/cart-page",
        element: (
          <PrivateRouter>
            <CartPage />
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "manage-items",
        element: <ManageItems />,
      },
      {
        path: "bookings",
        element: <ManageBookings />,
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BACKEND_URL}/menu/${params.id}`),
      },
    ],
  },
]);

export default router;
