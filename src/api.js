import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL|| "http://127.0.0.1:8000/api/";

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh");

      if (refreshToken) {
        try {
          const res = await axios.post(`${BASE_URL}token/refresh/`, {
            refresh: refreshToken,
          });
          const newAccess = res.data.access;
          localStorage.setItem("access", newAccess);
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return API(originalRequest);
        } catch (refreshErr) {
          console.error("Token refresh failed:", refreshErr);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("authUser");
          window.dispatchEvent(new CustomEvent("userLogout"));
        }
      }
    }

    return Promise.reject(error);
  }
);

export default API;
