import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { showToast } from "./toastSlice"; // Import showToast action

interface AdminCredentials {
  email: string;
  password: string;
}

interface AdminState {
  admin: { email: string; role: string; admin_id: number | null };
  token: string | null;
  loading: boolean;
  error: string | null;
}

const storeAuthData = (
  token: string,
  admin: { email: string; role: string; admin_id: number }
) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("admin_email", admin.email);
  localStorage.setItem("admin_id", admin.admin_id.toString());
  localStorage.setItem("admin_role", admin.role);
};

const getStoredAuthData = () => {
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("admin_role");
  const email = localStorage.getItem("admin_email");
  const admin_id = localStorage.getItem("admin_id");

  return {
    token: token || null,
    admin: {
      email: email || "",
      role: role || "",
      admin_id: admin_id ? parseInt(admin_id) : null,
    },
  };
};

const initialState: AdminState = {
  ...getStoredAuthData(),
  loading: false,
  error: null,
};

// Async thunk for login
export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (credentials: AdminCredentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
      dispatch(
        showToast({ message: "Logged in successfully!", type: "success" })
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
      dispatch(showToast({ message: errorMessage, type: "error" })); // Show error toast
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for signup
export const signupAdmin = createAsyncThunk(
  "admin/signup",
  async (credentials: AdminCredentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/signup", {
        admin: credentials,
      });
      dispatch(
        showToast({ message: "Signed up successfully!", type: "success" })
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Error occurred during signup";
      dispatch(showToast({ message: errorMessage, type: "error" }));
      return rejectWithValue(errorMessage);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.admin = { email: "", role: "", admin_id: null };
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("admin_email");
      localStorage.removeItem("admin_id");
      localStorage.removeItem("admin_role");
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
        storeAuthData(action.payload.token, action.payload.admin);
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
        state.loading = false;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
        storeAuthData(action.payload.token, action.payload.admin);
      })
      .addCase(signupAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = adminSlice.actions;

export default adminSlice.reducer;
