import { useContext } from "react";
import { ChatContext } from "../chat.context";
import { getConversations } from "../Services/chat.api";


export const useChat = () => {
    const context = useContext(ChatContext)

    if(!context){
        throw new Error("useChat must be used inside chat context provider")
    }

    const {contacts, setContacts, loading, setLoading, error, setError} = context

    const handleGetConversations = async() => {
        setLoading(true)
        try {
            const response = await getConversations()
            console.log(response)
            return response
        } catch (error: unknown) {
           if(error instanceof Error){
            setError(error)
           } else {
            setError("Something went wrong")
           }
        } finally {
            setLoading(false)
        }
    }

    return {
        contacts,
        loading,
        error,
        handleGetConversations
    }
}