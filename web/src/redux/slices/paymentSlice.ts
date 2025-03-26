import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { showToast } from "./toastSlice";
import { fetchPropertyById } from "../slices/propertiesSlice";

export interface ILedger {
  id: number;
  admin_id: number;
  wallet_id: number;
  transaction_type: "deposit" | "withdrawal";
  amount: number;
  balance_after: number;
  description: string;
  created_at: string; // or Date
  updated_at: string; // or Date
}

export interface IPayment {
  id: number;
  transaction_id: string;
  bill_ref_number: string;
  msisdn: string;
  transaction_amount: number;
  transaction_type: string;
  payment_date: string;
  short_code: string;
  status: string;
  property_id: string;
  house_number: string;
  settled: boolean;
}
interface Wallet {
  balance: number;
  // Add more wallet fields if needed
}

interface PaymentState {
  ledger: ILedger[];
  data: IPayment[];
  wallet: Wallet | null;
  loading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  data: [],
  ledger: [],
  wallet: null,
  loading: false,
  error: null,
};

// Fetch payments by property id
export const fetchPaymentsByProperty = createAsyncThunk(
  "payments/fetchPaymentsByProperty",
  async (propertyId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: { property_id: propertyId },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch monthly payments for a property (filter by property_id, month, and year)
export const fetchMonthlyPropertyPayments = createAsyncThunk(
  "payments/fetchMonthlyPropertyPayments",
  async (
    {
      propertyId,
      month,
      year,
    }: { propertyId: string; month: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: { property_id: propertyId, month, year },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// Fetch yearly payments for a property (filter by property_id and year)
export const fetchYearlyPropertyPayments = createAsyncThunk(
  "payments/fetchYearlyPropertyPayments",
  async (
    { propertyId, year }: { propertyId: string; year: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: { property_id: propertyId, year },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// New thunk: Fetch all payments (for system admin) filtered by year and optionally month
export const fetchAllPaymentData = createAsyncThunk(
  "payments/fetchAllPaymentData",
  async (
    { month, year }: { month?: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      const params: any = { year };
      if (month !== undefined) {
        params.month = month;
      }
      const response = await axiosInstance.get("/payments", { params });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// New: Update a payment (e.g., mark it as settled)
// Payment slice partial
export const updatePayment = createAsyncThunk(
  "payments/updatePayment",
  async (
    { paymentId, updates }: { paymentId: number; updates: Partial<IPayment> },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.put(`/payments/${paymentId}`, {
        payment: updates,
      });

      const updatedPayment = response.data as IPayment;

      // Only dispatch if this payment has now been settled
      if (updatedPayment.settled) {
        dispatch(fetchWalletBalance());
        dispatch(fetchLedgerEntries());

        // property_id in DB is a string; ensure it's a number for fetchPropertyById
        const numericPropertyId =
          parseInt(updatedPayment.property_id, 10) - 1000;

        if (!isNaN(numericPropertyId)) {
          dispatch(fetchPropertyById(numericPropertyId));
        }
      }

      return updatedPayment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to update payment"
      );
    }
  }
);

// --- NEW: Fetch Wallet Balance Thunk ---
export const fetchWalletBalance = createAsyncThunk(
  "payments/fetchWalletBalance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/wallets/current");
      return response.data; // Expected to return a wallet object with at least a 'balance' field
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// --- withdrawal Thunk ---
// File: /web/src/redux/slices/paymentSlice.ts
export const initiateWithdrawal = createAsyncThunk(
  "payments/initiateWithdrawal",
  async (
    {
      amount,
      withdrawal_type,
      recipient_details,
    }: { amount: number; withdrawal_type: string; recipient_details: any },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post("/withdrawals", {
        amount,
        withdrawal_type,
        recipient_details,
      });
      dispatch(fetchWalletBalance());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchLedgerEntries = createAsyncThunk(
  "payments/fetchLedgerEntries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ledger_entries");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetchPaymentsByProperty
    builder.addCase(fetchPaymentsByProperty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPaymentsByProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPaymentsByProperty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({
        message: "Failed to fetch payments by property",
        type: "error",
      });
    });

    // fetchMonthlyPropertyPayments
    builder.addCase(fetchMonthlyPropertyPayments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMonthlyPropertyPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchMonthlyPropertyPayments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({ message: "Failed to fetch monthly payments", type: "error" });
    });

    // fetchYearlyPropertyPayments
    builder.addCase(fetchYearlyPropertyPayments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchYearlyPropertyPayments.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchYearlyPropertyPayments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({ message: "Failed to fetch yearly payments", type: "error" });
    });

    // fetchAllPaymentData
    builder.addCase(fetchAllPaymentData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllPaymentData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllPaymentData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({ message: "Failed to fetch all payments", type: "error" });
    });

    // update payment info(settled only)
    builder.addCase(updatePayment.fulfilled, (state, action) => {
      state.loading = false;
      const updatedPayment = action.payload as IPayment;
      // Find the index in `state.data` and update it
      const index = state.data.findIndex((p) => p.id === updatedPayment.id);
      if (index !== -1) {
        state.data[index] = updatedPayment;
      }
      showToast({ message: "Payment updated successfully", type: "success" });
    });
    builder.addCase(updatePayment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({ message: state.error, type: "error" });
    });

    // New cases for wallet balance
    builder.addCase(fetchWalletBalance.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWalletBalance.fulfilled, (state, action) => {
      state.loading = false;
      state.wallet = action.payload; // e.g., { balance: 0.0, ... }
    });
    builder.addCase(fetchWalletBalance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({ message: "Failed to fetch wallet balance", type: "error" });
    });

    // New case for withdrawal requests
    builder.addCase(initiateWithdrawal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initiateWithdrawal.fulfilled, (state) => {
      state.loading = false;

      showToast({ message: "Withdrawal success", type: "success" });
    });
    builder.addCase(initiateWithdrawal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({ message: "Withdrawal request failed", type: "error" });
    });

    builder.addCase(fetchLedgerEntries.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLedgerEntries.fulfilled, (state, action) => {
      state.loading = false;
      state.ledger = action.payload; // <--- store them in ledger
    });
    builder.addCase(fetchLedgerEntries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      showToast({ message: "Failed to fetch ledger entries", type: "error" });
    });
  },
});

export default paymentSlice.reducer;
