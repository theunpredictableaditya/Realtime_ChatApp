import axios from "axios";
import type { RegisterUserArgument, LoginUserArgument } from "../../../types";

const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
});

export const register = async ({
  username,
  fullname,
  email,
  password,
}: RegisterUserArgument) => {
  const response = await api.post("/api/auth/v1/register", {
    username,
    fullname,
    email,
    password,
  });

  return response.data;
};

export const login = async({email, password}: LoginUserArgument) => {
    const response = await api.post("/api/auth/v1/login", {
        email,
        password
    })

    return response.data
}


export const getMe = async() => {
    const response = await api.get("/api/auth/v1/getme")

    return response.data
}

export const logout = async() => {
    const response = await api.post("/api/auth/v1/logout")

    return response.data
}