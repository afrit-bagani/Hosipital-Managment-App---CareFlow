import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import SignupPage from "@/pages/SignUpPage";
import SigninPage from "@/pages/SigninPage";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedRoute from "@/components/ProtectedRoute";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "sign-up", element: <SignupPage /> },
  { path: "sign-in", element: <SigninPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "dashboard", element: <UserDashboard /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
