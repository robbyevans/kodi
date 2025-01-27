import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";

interface AdminCredentials {
  email: string;
  password: string;
}

interface AdminState {
  isAuthenticated: boolean;
  role: string | null;
  loading: boolean;
  error: string | null;
  currentAdmin: { email: string; role: string } | null;
}

// Retrieve stored authentication and role from localStorage
const storedIsAuthenticated =
  localStorage.getItem("isAuthenticated") === "true";
const storedRole = localStorage.getItem("role");
const storedEmail = localStorage.getItem("email");

// Initialize state based on localStorage values
const initialState: AdminState = {
  isAuthenticated: storedIsAuthenticated,
  role: storedRole || "", // Default role to an empty string if null
  loading: false,
  error: null,
  currentAdmin: storedIsAuthenticated
    ? { email: storedEmail || "", role: storedRole || "" } // Default email and role to empty strings
    : null,
};

// Async thunk for logging in the admin
export const loginAdmin = createAsyncThunk(
  "admins/loginAdmin",
  async (credentials: AdminCredentials) => {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  }
);

// Async thunk for logging out the admin
export const logoutAdmin = createAsyncThunk(
  "admins/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.delete("/logout");
      return { message: "Logged out successfully" };
    } catch (error: any) {
      console.error("Logout error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async thunk for adding a new admin
export const addAdmin = createAsyncThunk(
  "admins/addAdmin",
  async (
    newAdmin: {
      email: string;
      password: string;
      password_confirmation: string;
      role: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/admins", newAdmin);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add admin"
      );
    }
  }
);

// Admin slice for handling authentication state
const adminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.currentAdmin = {
          email: action.payload.email,
          role: action.payload.role,
        };
        state.error = null;

        // Save to localStorage on successful login
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("email", action.payload.email);
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to log in";
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.error = null;
        state.currentAdmin = null; // Clear currentAdmin on logout

        // Clear localStorage on logout
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.error = action.payload as string | null; // Store the error in the state
      })
      .addCase(addAdmin.fulfilled, (state) => {
        state.error = null; // Admin added successfully
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.error = action.payload as string | null; // Handle error
      });
  },
});

export default adminsSlice.reducer;
