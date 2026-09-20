import type { Dispatch, SetStateAction } from "react"

interface User {
    _id: string
    fullname: string
    username: string
    email: string
}

interface AuthContextType {
    user: User | null
    setUser: Dispatch<SetStateAction<User | null>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    error: unknown
    setError :Dispatch<SetStateAction<unknown>>
}

interface LoginUserArgument {
    email: string;
    password: string;
}

interface RegisterUserArgument extends LoginUserArgument{
  username: string;
  fullname: string;
}

export type{
    User,
    AuthContextType,
    RegisterUserArgument,
    LoginUserArgument
}