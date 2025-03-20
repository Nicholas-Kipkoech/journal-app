import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080"; // Update to match your backend

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 1 min timeout
});

// Attach token automatically in each request
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("access_token"); // Retrieve token from cookies

      console.log("🔹 Token Found:", token); // Debugging: Check if token exists

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      console.warn(
        "⚠️ Running on Server - No localStorage / Cookies available"
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
