import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "/api";
const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default API;
