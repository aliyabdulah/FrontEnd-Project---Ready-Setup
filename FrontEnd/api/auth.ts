import axios from "axios";
import { storeToken } from "./storage";

export const api = axios.create({
  baseURL: "http://localhost:8000", // Your backend server URL
});

// REGISTER
export const register = async (userInfo: {
  username: string;
  password: string;
  image: string | null;
}) => {
  const formData = new FormData();
  formData.append("username", userInfo.username);
  formData.append("password", userInfo.password);
  if (userInfo.image) {
    formData.append(
      "image",
      {
        name: "profile.jpg",
        uri: userInfo.image,
        type: "image/jpeg",
      } as any
    );
  }

  const { data } = await api.post("/api/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (data?.token) await storeToken(data.token);
  return data;
};

// LOGIN
export const login = async (userInfo: { username: string; password: string }) => {
  const { data } = await api.post("/api/auth/login", userInfo);
  if (data?.token) await storeToken(data.token);
  return data;
};