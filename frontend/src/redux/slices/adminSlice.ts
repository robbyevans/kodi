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

export const logoutAdmin = createAsyncThunk("admins/logoutAdmin", async () => {
  await axiosInstance.delete("/logout");
});

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
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to log in";
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export default adminsSlice.reducer;
