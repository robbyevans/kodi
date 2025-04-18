import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  message: string | null;
  type: "success" | "error" | "info" | null;
}

const initialState: ToastState = {
  message: null,
  type: null,
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: "success" | "error" | "info" | null;
      }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearToast: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
