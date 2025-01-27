import axios from "axios";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store"; // Adjust the path based on your setup

// Typed hooks for use throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend's base URL
  // withCredentials: true,
});

export default axiosInstance;
