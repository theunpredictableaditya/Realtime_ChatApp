import axios from 'axios'

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getConversations = async() => {
    const response = await api.get("/api/conversation/v1/get-conversations")

    return response.data
}