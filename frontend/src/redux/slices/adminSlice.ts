// adminSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";

interface AdminCredentials {
  email: string;
  password: string;
}

interface AdminState {
  admin: null | { email: string; role: string; admin_id: number };
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  admin: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (credentials: AdminCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
      const { token, admin } = response.data;

      // Store the token in localStorage
      localStorage.setItem("auth_token", token);
      console.log(localStorage.getItem("auth_token"));

      return { token, admin };
    } catch (error: any) {
      // Handling both API and network errors
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
      return rejectWithValue(errorMessage);
    }
  }
);

export const signupAdmin = createAsyncThunk(
  "admin/signup",
  async (credentials: AdminCredentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signup", {
        admin: credentials, // Nest the credentials under the 'admin' key
      });
      return response.data; // Return new admin data
    } catch (error: any) {
      // Handling both API and network errors
      const errorMessage =
        error.response?.data?.error || "Error occurred during signup";
      return rejectWithValue(errorMessage);
    }
  }
);
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signupAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupAdmin.fulfilled, (state, action) => {
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(signupAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = adminSlice.actions;

export default adminSlice.reducer;
