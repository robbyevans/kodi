import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../utils";
import { showToast } from "./toastSlice";

interface PasswordResetState {
  step: "request" | "verify" | "reset";
  loading: boolean;
  error: string | null;
}

const initialState: PasswordResetState = {
  step: "request",
  loading: false,
  error: null,
};

export const sendResetCode = createAsyncThunk<
  void,
  { email: string },
  { rejectValue: string }
>(
  "passwordReset/sendCode",
  async ({ email }, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/password_resets", { email });
      dispatch(showToast({ message: "Reset code sent!", type: "success" }));
    } catch (err: any) {
      const error = err.response?.data?.error || err.message;
      dispatch(showToast({ message: error, type: "error" }));
      return rejectWithValue(error);
    }
  }
);

export const verifyResetCode = createAsyncThunk<
  void,
  { email: string; code: string },
  { rejectValue: string }
>(
  "passwordReset/verifyCode",
  async ({ email, code }, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/password_resets/verify", { email, code });
      dispatch(showToast({ message: "Code valid!", type: "success" }));
    } catch (err: any) {
      const error = err.response?.data?.error || "Invalid or expired code";
      dispatch(showToast({ message: error, type: "error" }));
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk<
  void,
  {
    email: string;
    code: string;
    password: string;
    password_confirmation: string;
  },
  { rejectValue: string }
>("passwordReset/reset", async (payload, { dispatch, rejectWithValue }) => {
  try {
    await axios.post("/password_resets/reset", payload);
    dispatch(showToast({ message: "Password reset!", type: "success" }));
  } catch (err: any) {
    const error = err.response?.data?.error || err.message;
    dispatch(showToast({ message: error, type: "error" }));
    return rejectWithValue(error);
  }
});

const slice = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    toVerify(state) {
      state.step = "verify";
      state.error = null;
    },
    toReset(state) {
      state.step = "reset";
      state.error = null;
    },
    toRequest(state) {
      state.step = "request";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          action.type.startsWith("passwordReset/") &&
          action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("passwordReset/") &&
          action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { toVerify, toReset, toRequest } = slice.actions;
export default slice.reducer;
