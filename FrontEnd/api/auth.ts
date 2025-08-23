import axios from "axios";
import { storeToken } from "./storage";

export const api = axios.create({
  baseURL: "TO_BE_COMPLETED", // e.g., https://api.example.com
});

// REGISTER
export const register = async (userInfo: {
  username: string;
  password: string;
  image: string | null; // file URI
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

  // TODO: replace endpoint path
  const { data } = await api.post("TO_BE_COMPLETED", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (data?.token) await storeToken(data.token);
  return data;
};

// LOGIN
export const login = async (userInfo: { username: string; password: string }) => {
  // TODO: replace endpoint path
  const { data } = await api.post("TO_BE_COMPLETED", userInfo);
  if (data?.token) await storeToken(data.token);
  return data;
};
