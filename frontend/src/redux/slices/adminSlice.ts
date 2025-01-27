import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";

interface AdminCredentials {
  email: string;
  password: string;
}

interface AdminState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  isAuthenticated: false,
  loading: false,
  error: null,
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

export const signupAdmin = createAsyncThunk(
  "admins/signupAdmin",
  async (
    credentials: {
      email: string;
      password: string;
      password_confirmation: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/signup", {
        admin: credentials,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
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
      .addCase(loginAdmin.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to log in";
      })
      .addCase(signupAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAdmin.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(signupAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to sign up";
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.error = null; // Clear any previous errors
      })
      .addCase(logoutAdmin.rejected, (state, action) => {
        state.error = action.payload as string | null; // Store the error in the state
      });
  },
});

export default adminsSlice.reducer;
