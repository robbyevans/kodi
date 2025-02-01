// utils.ts
import axios from "axios";

// utils.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store"; // Adjust path if needed

// Typed Redux hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Function to get auth token safely
const getAuthToken = () =>
  localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // Use VITE_ prefix for Vite environment variables
  withCredentials: true,
});

// Request Interceptor: Attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle unauthorized errors or network issues
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      sessionStorage.removeItem("auth_token");
    } else if (!error.response) {
      // Network error or no response
      return Promise.reject(
        new Error("Network error or no response from the server")
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
