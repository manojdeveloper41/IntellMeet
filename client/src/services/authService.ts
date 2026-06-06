import api from "@/api/axios";

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/auth/signup", {
    name,
    email,
    password,
  });

  return response.data;
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};