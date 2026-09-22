import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./features/Auth/auth.context"
import { router } from "./app.routes"
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
    <Toaster />
    </>
  )
}

export default App