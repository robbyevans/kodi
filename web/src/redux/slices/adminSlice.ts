import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { showToast } from "./toastSlice";
import type { AxiosError } from "axios";

// -------------------------------------
// TYPES
// -------------------------------------
export interface IUser {
  admin_id: number | null;
  name: string;
  email: string;
  role: string;
  phone_number: string;
  profile_image?: string;
  device_token?: string;
  is_notifications_allowed: boolean;
  is_terms_and_conditions_agreed: boolean;

  // our new confirmation fields:
  email_confirmed_at: string | null;
  is_email_verified: boolean;
}

interface AdminState {
  admin: IUser;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface AdminResponse {
  token: string;
  admin: IUser;
}

export interface GoogleAuthPayload {
  token: string;
  mode: "login" | "signup";
}

// -------------------------------------
// HELPERS
// -------------------------------------
const storeAuthData = (token: string, admin: IUser) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("name", admin.name);
  localStorage.setItem("admin_email", admin.email);
  localStorage.setItem("admin_id", admin.admin_id?.toString() ?? "");
  localStorage.setItem("admin_role", admin.role);
  localStorage.setItem("profile_image", admin.profile_image || "");
  localStorage.setItem("phone_number", admin.phone_number);
  localStorage.setItem(
    "is_notifications_allowed",
    String(admin.is_notifications_allowed)
  );
  localStorage.setItem(
    "is_terms_and_conditions_agreed",
    String(admin.is_terms_and_conditions_agreed)
  );
  localStorage.setItem("device_token", admin.device_token || "");
  localStorage.setItem("is_email_verified", String(admin.is_email_verified));
  if (admin.email_confirmed_at) {
    localStorage.setItem("email_confirmed_at", admin.email_confirmed_at);
  }
};

const getStoredAuthData = (): Pick<AdminState, "token" | "admin"> => {
  const token = localStorage.getItem("auth_token");
  const admin_id = parseInt(localStorage.getItem("admin_id") || "", 10) || null;
  const is_notifications_allowed =
    localStorage.getItem("is_notifications_allowed") === "true";
  const is_terms_and_conditions_agreed =
    localStorage.getItem("is_terms_and_conditions_agreed") === "true";
  const is_email_verified =
    localStorage.getItem("is_email_verified") === "true";
  const email_confirmed_at = localStorage.getItem("email_confirmed_at") || null;

  return {
    token: token || null,
    admin: {
      admin_id,
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("admin_email") || "",
      role: localStorage.getItem("admin_role") || "",
      phone_number: localStorage.getItem("phone_number") || "",
      profile_image: localStorage.getItem("profile_image") || undefined,
      device_token: localStorage.getItem("device_token") || undefined,
      is_notifications_allowed,
      is_terms_and_conditions_agreed,
      is_email_verified,
      email_confirmed_at,
    },
  };
};

// -------------------------------------
// INITIAL STATE
// -------------------------------------
const initialState: AdminState = {
  ...getStoredAuthData(),
  loading: false,
  error: null,
};

// -------------------------------------
// ASYNC THUNKS
// -------------------------------------
export const loginAdmin = createAsyncThunk<
  AdminResponse,
  { email: string; password: string }
>("admin/loginAdmin", async (credentials, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/login", credentials);
    dispatch(
      showToast({ message: "Logged in successfully!", type: "success" })
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    const msg = err.response?.data?.error || "Something went wrong";
    dispatch(showToast({ message: msg, type: "error" }));
    return rejectWithValue(msg);
  }
});

export const signupAdmin = createAsyncThunk<
  AdminResponse,
  { name: string; email: string; password: string; phone_number: string }
>("admin/signup", async (creds, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/signup", { admin: creds });
    dispatch(
      showToast({ message: "Signed up successfully!", type: "success" })
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ error: string }>;
    const msg = err.response?.data?.error || "Signup failed";
    dispatch(showToast({ message: msg, type: "error" }));
    return rejectWithValue(msg);
  }
});

export const googleAuthAdmin = createAsyncThunk<
  AdminResponse,
  GoogleAuthPayload
>(
  "admin/googleAuthAdmin",
  async ({ token, mode }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/google", {
        token,
        mode,
      });
      dispatch(
        showToast({
          message: `Successfully ${mode} via Google!`,
          type: "success",
        })
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const msg = err.response?.data?.error || "Google auth failed";
      dispatch(showToast({ message: msg, type: "error" }));
      return rejectWithValue(msg);
    }
  }
);

export const fetchCurrentAdmin = createAsyncThunk<
  IUser,
  void,
  { rejectValue: string }
>("admin/fetchCurrent", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/admins/current");
    return data as IUser;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const editAdmin = createAsyncThunk<
  IUser,
  { adminId: number; data: Partial<IUser> | FormData }
>(
  "admin/editAdmin",
  async ({ adminId, data }, { dispatch, rejectWithValue }) => {
    try {
      let payload: any;
      const headers: Record<string, string> = {};

      if (data instanceof FormData) {
        payload = data;
        headers["Content-Type"] = "multipart/form-data";
      } else {
        payload = { admin: data };
      }

      const response = await axiosInstance.put(`/admins/${adminId}`, payload, {
        headers,
      });
      return response.data as IUser;
    } catch (error) {
      const err = error as AxiosError<{ error: string }>;
      const msg = err.response?.data?.error || "Update admin failed";
      dispatch(showToast({ message: msg, type: "error" }));
      return rejectWithValue(msg);
    }
  }
);

// -------------------------------------
// SLICE
// -------------------------------------
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout(state) {
      state.admin = {
        ...getStoredAuthData().admin,
        admin_id: null,
        name: "",
        email: "",
        role: "",
        phone_number: "",
        profile_image: undefined,
        device_token: undefined,
      };
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginAdmin.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.admin = a.payload.admin;
        storeAuthData(a.payload.token, a.payload.admin);
      })
      .addCase(loginAdmin.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      .addCase(signupAdmin.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(signupAdmin.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.admin = a.payload.admin;
        storeAuthData(a.payload.token, a.payload.admin);
      })
      .addCase(signupAdmin.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })

      .addCase(googleAuthAdmin.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(googleAuthAdmin.fulfilled, (s, a) => {
        s.loading = false;
        s.token = a.payload.token;
        s.admin = a.payload.admin;
        storeAuthData(a.payload.token, a.payload.admin);
      })
      .addCase(googleAuthAdmin.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      })
      .addCase(fetchCurrentAdmin.fulfilled, (s, action) => {
        s.admin = action.payload;
        storeAuthData(s.token!, action.payload);
      })

      .addCase(editAdmin.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(editAdmin.fulfilled, (s, a) => {
        s.loading = false;
        s.admin = a.payload;
        storeAuthData(s.token!, a.payload);
      })
      .addCase(editAdmin.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload as string;
      });
  },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;
