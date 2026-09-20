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
}

export type{
    User,
    AuthContextType
}