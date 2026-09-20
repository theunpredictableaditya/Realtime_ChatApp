import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register } from "../Services/auth.api";
import type { LoginUserArgument, RegisterUserArgument } from "../../../types";

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error("useAuth must be used within AuthProvider!")
    }


    const { setUser, setLoading, setError } = context

    const handleRegister = async({username, fullname, email, password}: RegisterUserArgument) => {
        setLoading(true)
        try {
            const response = await register({username, fullname, email, password})

            setUser(response)
        } catch (error: unknown) {
            if(error instanceof Error){
                setError(error)
            }else{
                setError("Something went wrong!")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async({email, password}: LoginUserArgument) => {
        setLoading(true)
        try {
            const response = await login({email, password})

            setUser(response)
        } catch (error: unknown) {
            if(error instanceof Error){
                setError(error)
            }else{
                setError("Something went wrong!")
            }
        } finally {
            setLoading(false)
        }
    }


    return {
        handleRegister,
        handleLogin
    }
}