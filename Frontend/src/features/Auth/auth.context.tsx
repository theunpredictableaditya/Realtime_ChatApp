import type { ReactNode } from "react";
import { createContext, useState } from "react";
import type { User, AuthContextType } from "../../types";

export const AuthContext = createContext<AuthContextType | undefined>( undefined )

const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<unknown>(null)

    return (<AuthContext.Provider value={{user, setUser, loading, setLoading, error, setError}}>
        {children}
    </AuthContext.Provider>)
}

export {
    AuthProvider
}