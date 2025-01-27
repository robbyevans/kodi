import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";

interface AdminCredentials {
  email: string;
  password: string;
}

interface AdminState {
  isAuthenticated: boolean;
  role: string | null; // Added `role`
  loading: boolean;
  error: string | null;
  currentAdmin: { email: string; role: string } | null; // Stores current admin details
}

const initialState: AdminState = {
  isAuthenticated: false,
  role: null,
  loading: false,
  error: null,
  currentAdmin: null,
};

export const loginAdmin = createAsyncThunk(
  "admins/loginAdmin",
  async (credentials: AdminCredentials) => {
    const response = await axiosInstance.post("/login", credentials);
    return response.data;
  }
);

export const logoutAdmin = createAsyncThunk(
  "admins/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      console.log("Logging out");
      await axiosInstance.delete("/logout");
      return { message: "Logged out successfully" };
    } catch (error: any) {
      console.error("Logout error:", error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

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
        console.log("Login response:", action.payload);
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
        state.currentAdmin = {
          email: action.payload.email,
          role: action.payload.role,
        };
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to log in";
      })

      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.error = null;
        state.currentAdmin = null; // Clear currentAdmin on logout
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
