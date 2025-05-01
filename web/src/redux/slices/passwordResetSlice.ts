import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils";
import { showToast } from "./toastSlice";
import { PayloadAction } from "@reduxjs/toolkit";

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

export const sendResetCode = createAsyncThunk<void, { email: string }>(
  "passwordReset/sendCode",
  async ({ email }, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/password_resets", { email });
      dispatch(showToast({ message: "Reset code sent!", type: "success" }));
    } catch (e: any) {
      dispatch(showToast({ message: e.message, type: "error" }));
      return rejectWithValue(e.message);
    }
  }
);

export const verifyResetCode = createAsyncThunk<
  void,
  { email: string; code: string }
>(
  "passwordReset/verifyCode",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/password_resets/verify", payload);
      dispatch(showToast({ message: "Code valid!", type: "success" }));
    } catch (e: any) {
      dispatch(
        showToast({ message: "Invalid or expired code", type: "error" })
      );
      return rejectWithValue(e.message);
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
  }
>("passwordReset/reset", async (payload, { dispatch, rejectWithValue }) => {
  try {
    await axios.post("/password_resets/reset", payload);
    dispatch(showToast({ message: "Password reset!", type: "success" }));
  } catch (e: any) {
    dispatch(showToast({ message: e.message, type: "error" }));
    return rejectWithValue(e.message);
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
  extraReducers: (b) =>
    b
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
          state.error = null;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/rejected") &&
          action.type.startsWith("passwordReset/"),
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      ),
});

export const { toVerify, toReset, toRequest } = slice.actions;
export default slice.reducer;
