import { createBrowserRouter } from "react-router-dom"
import Register from "./features/Auth/Pages/Register"
import Chat from "./features/Chat/Pages/Chat"
import Login from "./features/Auth/Pages/Login"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/chats",
        element: <Chat />
    }
])