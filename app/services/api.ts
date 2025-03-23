import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // Update to match your backend

export const PrivateAxiosUtility = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AxiosUtility = axios.create({
  baseURL: `${API_BASE_URL}`,
  timeout: 600000,
  headers: {
    "Content-Type": "application/json",
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
PrivateAxiosUtility.interceptors.request.use((req: any) => {
  if (typeof window !== "undefined") {
    const state = localStorage?.getItem("access_token");
    let token;
    if (state) {
      token = state;
      req.headers.Authorization = `Bearer ${token}`;
    }
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  }
});

export default AxiosUtility;
