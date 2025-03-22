// File: /web/src/redux/slices/notificationSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { showToast } from "./toastSlice";

/** A generic notification type.
 *  For unsettled payments, we store extra fields like paymentId, houseNumber, etc. */
export interface INotification {
  id: number;
  type: "unsettledPayment" | "system" | "other";
  title: string;
  content: string;
  paymentId?: number; // if type === "unsettledPayment"
  houseNumber?: string; // optional extra fields
  amount?: number; // optional extra fields
}

interface NotificationState {
  items: INotification[];
  loading: boolean;
  error: string | null;
}

// Example: fetch unsettled payments + system messages
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, you might do multiple calls or a custom /notifications endpoint
      // 1) fetch unsettled payments
      const unsettledRes = await axiosInstance.get("/payments?settled=false");
      // 2) fetch system messages (dummy or from an endpoint)
      // const systemRes = await axiosInstance.get("/someSystemMessages");

      const unsettledPayments = unsettledRes.data.map((payment: any) => ({
        id: payment.id, // or payment.transaction_id
        type: "unsettledPayment" as const,
        title: `Unsettled Payment #${payment.id}`,
        content: `House: ${payment.house_number} | Amount: ${payment.transaction_amount}`,
        paymentId: payment.id,
        houseNumber: payment.house_number,
        amount: payment.transaction_amount,
      }));

      // Hard-coded system notifications for demonstration
      const systemMessages = [
        {
          id: 2001,
          type: "system" as const,
          title: "System Update",
          content: "Your system has been updated to the latest version.",
        },
      ];

      return [...unsettledPayments, ...systemMessages];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch notifications"
      );
    }
  }
);

const initialState: NotificationState = {
  items: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    // e.g. remove a notification from state if user has "settled" it or read it
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      state.items = state.items.filter((n) => n.id !== notificationId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        showToast({ message: state.error, type: "error" });
      });
  },
});

export const { removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
