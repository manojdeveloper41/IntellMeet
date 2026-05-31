import axios from "axios";

export const authApi = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return authApi.post("/signup", data);
};

export const login = async (data: {
  email: string;
  password: string;
}) => {
  return authApi.post("/login", data);
};