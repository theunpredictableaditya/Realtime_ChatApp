import axios from "axios";
import type { RegisterUserArgument } from "../../../types";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
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
