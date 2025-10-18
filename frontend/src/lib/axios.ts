import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ your backend URL
  withCredentials: true, // optional, only if you use cookies
});

export default api;
