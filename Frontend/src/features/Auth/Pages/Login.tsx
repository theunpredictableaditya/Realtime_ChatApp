import { useEffect } from "react"
import { useAuth } from "../Hooks/useAuth"

const Login = () => {

  const { user } = useAuth()

  useEffect(() => {
    console.log(user)
  }, [])

  return (
    <div>
      Login
    </div>
  )
}

export default Login
