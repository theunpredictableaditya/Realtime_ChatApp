import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { ChatContextType } from "../../types";
import { getConversations } from "./Services/chat.api";

export const ChatContext = createContext<ChatContextType | undefined>( undefined )

const ChatProvider = ({children}: {children: ReactNode}) => {
    const [contacts, setContacts] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<unknown>(null)

    useEffect(() => {
        ;(async() => {
            try {
                const response = await getConversations()

                console.log(response)
            } catch (error) {
                console.log(error)
            }
        })()

    }, [])
    

    return <ChatContext.Provider value={{contacts, setContacts, loading, setLoading, error, setError}}>
        {children}
    </ChatContext.Provider>
}

export { 
    ChatProvider
}