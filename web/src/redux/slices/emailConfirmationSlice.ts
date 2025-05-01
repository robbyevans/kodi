import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utils";
import { showToast } from "./toastSlice";

interface EmailConfirmState {
  sent: boolean;
  confirmed: boolean;
  loading: boolean;
  error: string | null;
}
const initialState: EmailConfirmState = {
  sent: false,
  confirmed: false,
  loading: false,
  error: null,
};

export const sendConfirmationCode = createAsyncThunk(
  "emailConfirm/sendCode",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/admins/send_confirmation_code");
      dispatch(showToast({ type: "success", message: "Code sent!" }));
    } catch (e: any) {
      dispatch(showToast({ type: "error", message: e.message }));
      return rejectWithValue(e.message);
    }
  }
);

export const confirmEmail = createAsyncThunk<void, { code: string }>(
  "emailConfirm/confirm",
  async ({ code }, { dispatch, rejectWithValue }) => {
    try {
      await axios.post("/admins/confirm_email", { code });
      dispatch(showToast({ type: "success", message: "Email confirmed!" }));
    } catch (e: any) {
      dispatch(showToast({ type: "error", message: "Invalid code" }));
      return rejectWithValue(e.message);
    }
  }
);

const slice = createSlice({
  name: "emailConfirm",
  initialState,
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(sendConfirmationCode.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(sendConfirmationCode.fulfilled, (s) => {
        s.loading = false;
        s.sent = true;
      })
      .addCase(sendConfirmationCode.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      })
      .addCase(confirmEmail.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(confirmEmail.fulfilled, (s) => {
        s.loading = false;
        s.confirmed = true;
      })
      .addCase(confirmEmail.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload as string;
      }),
});
export default slice.reducer;
