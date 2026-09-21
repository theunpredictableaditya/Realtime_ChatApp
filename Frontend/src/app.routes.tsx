import { createBrowserRouter } from "react-router-dom"
import Register from "./features/Auth/Pages/Register"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Register />
    }
])