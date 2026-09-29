import { createBrowserRouter } from "react-router-dom";
import Register from "./features/Auth/Pages/Register";
import Chat from "./features/Chat/Pages/Chat";
import Login from "./features/Auth/Pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/chats",
        element: <Chat />,
      },
    ],
  },
]);
