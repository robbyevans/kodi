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
  currentAdmin: { email: string; role: string; admin_id: number } | null; // Add admin_id
}

// Retrieve stored authentication and role from localStorage
const storedIsAuthenticated =
  localStorage.getItem("isAuthenticated") === "true";
const storedRole = localStorage.getItem("role");
const storedEmail = localStorage.getItem("email");
const storedAdminId = localStorage.getItem("adminId"); // Retrieve admin_id from localStorage

// Initialize state based on localStorage values
const initialState: AdminState = {
  isAuthenticated: storedIsAuthenticated,
  role: storedRole || "",
  loading: false,
  error: null,
  currentAdmin: storedIsAuthenticated
    ? {
        email: storedEmail || "",
        role: storedRole || "",
        admin_id: storedAdminId ? parseInt(storedAdminId) : -1, // Parse admin_id as a number
      }
    : null,
};

// Async thunk for logging in the admin
export const loginAdmin = createAsyncThunk(
  "admins/loginAdmin",
  async (credentials: AdminCredentials) => {
    const response = await axiosInstance.post("/login", credentials);
    console.log("response", response);
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
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
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
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
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
          admin_id: action.payload.admin_id, // Include admin_id from the response
        };
        state.error = null;

        // Save to localStorage on successful login
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("role", action.payload.role);
        localStorage.setItem("email", action.payload.email);
        localStorage.setItem("adminId", action.payload.admin_id); // Save admin_id to localStorage
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
