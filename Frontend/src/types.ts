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

interface RegisterUserArgument {
  username: string;
  fullname: string;
  email: string;
  password: string;
}

export type{
    User,
    AuthContextType,
    RegisterUserArgument
}