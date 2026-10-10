import type { Dispatch, SetStateAction } from "react"

interface User {
    __v?: Number
    _id: string
    fullname: string
    username: string
    email: string
}

interface UserAuthResponse extends User {
    __v : Number
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



interface ContactData {
  name: string;
  lastMessage: string;
  time: string;
  avatarUrl: string;
  isOnline: boolean;
  isActive: boolean;
}

interface ChatContextType {
    contacts: ContactData[] | null
    setContacts: Dispatch<SetStateAction<ContactData[] | null>>
    loading: boolean
    setLoading: Dispatch<SetStateAction<boolean>>
    error: unknown
    setError: Dispatch<SetStateAction<unknown>>
}


export interface ConversationParticipant {
    _id: string;
    fullname: string;
    username: string;
}

export interface LastMessage {
    _id: string;
    content: string;
    createdAt: string;
    messageType: "text" | "image" | "video" | "file";
    sender: string;
}

export interface Conversation {
    _id: string;
    type: "direct" | "group";
    participants: ConversationParticipant[];
    lastMessage: LastMessage | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetConversationsResponse {
    data: Conversation[];
}


export type{
    User,
    UserAuthResponse,
    AuthContextType,
    ChatContextType,
    ContactData,
    RegisterUserArgument,
    LoginUserArgument
}