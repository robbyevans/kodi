import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { showToast } from "./toastSlice";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  profile_image?: File | string;
  phone_number: string;
  admin_id: number | null;
  role: string;
}

interface AdminState {
  admin: {
    email: string;
    role: string;
    admin_id: number | null;
    name: string;
    profile_image: string;
    phone_number: string;
  };
  token: string | null;
  loading: boolean;
  error: string | null;
}

const storeAuthData = (
  token: string,
  admin: {
    name: string;
    email: string;
    phone_number: string;
    profile_image: string;
    role: string;
    admin_id: number;
  }
) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("name", admin.name);
  localStorage.setItem("admin_email", admin.email);
  localStorage.setItem("admin_id", admin.admin_id.toString());
  localStorage.setItem("admin_role", admin.role);
  localStorage.setItem("profile_image", admin.profile_image);
  localStorage.setItem("phone_number", admin.phone_number);
};

const getStoredAuthData = () => {
  const token = localStorage.getItem("auth_token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("admin_role");
  const email = localStorage.getItem("admin_email");
  const admin_id = localStorage.getItem("admin_id");
  const phone_number = localStorage.getItem("phone_number");
  const profile_image = localStorage.getItem("profile_image");

  return {
    token: token || null,
    admin: {
      name: name || "",
      email: email || "",
      role: role || "",
      phone_number: phone_number || "",
      profile_image: profile_image || "",
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
  async (
    credentials: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/login", credentials);
      dispatch(
        showToast({ message: "Logged in successfully!", type: "success" })
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
      dispatch(showToast({ message: errorMessage, type: "error" }));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for signup
export const signupAdmin = createAsyncThunk(
  "admin/signup",
  async (
    credentials: { name: string; email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
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

// Async thunk for Google Authentication (for both login and signup)
export const googleAuthAdmin = createAsyncThunk(
  "admin/googleAuthAdmin",
  async (
    { token, mode }: { token: string; mode: "login" | "signup" },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/auth/google", {
        token,
        mode,
      });
      dispatch(
        showToast({
          message:
            mode === "login"
              ? "Logged in successfully!"
              : "Signed up successfully!",
          type: "success",
        })
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Google authentication failed";
      dispatch(showToast({ message: errorMessage, type: "error" }));
      return rejectWithValue(errorMessage);
    }
  }
);

export const editAdmin = createAsyncThunk(
  "admin/editAdmin",
  async (
    { adminId, data }: { adminId: number; data: Partial<IUser> | FormData },
    { dispatch, rejectWithValue }
  ) => {
    try {
      let payload: FormData | object;
      const headers: Record<string, string> = {};

      if (data instanceof FormData) {
        payload = data;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        if (data.profile_image && data.profile_image instanceof File) {
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            formData.append(`admin[${key}]`, value as any);
          });
          payload = formData;
          headers["Content-Type"] = "multipart/form-data";
        } else {
          payload = { admin: data };
        }
      }

      const response = await axiosInstance.put(`/admins/${adminId}`, payload, {
        headers,
      });
      dispatch(
        showToast({ message: "Admin updated successfully!", type: "success" })
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error || "Failed to update admin";
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
      state.admin = {
        name: "",
        phone_number: "",
        email: "",
        role: "",
        admin_id: null,
        profile_image: "",
      };
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("admin_email");
      localStorage.removeItem("name");
      localStorage.removeItem("admin_id");
      localStorage.removeItem("admin_role");
      localStorage.removeItem("phone_number");
      localStorage.removeItem("profile_image");
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
      })
      // Extra reducers for Google Auth
      .addCase(googleAuthAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuthAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.admin = action.payload.admin;
        storeAuthData(action.payload.token, action.payload.admin);
      })
      .addCase(googleAuthAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Extra reducers for editAdmin
      .addCase(editAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = {
          ...state.admin,
          ...action.payload,
        };
        if (action.payload.email) {
          localStorage.setItem("admin_email", action.payload.email);
        }
      })
      .addCase(editAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = adminSlice.actions;

export default adminSlice.reducer;
