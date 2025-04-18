import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { showToast } from "./toastSlice";

export interface ILedger {
  id: number;
  admin_id: number;
  wallet_id: number;
  transaction_type: "deposit" | "withdrawal";
  amount: number;
  balance_after: number;
  transaction_id: string;
  house_number: string;
  property_uid: string;
  created_at: string; // or Date
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

// Fetch payments with flexible filters
export const fetchPaymentsByProperties = createAsyncThunk(
  "payments/fetchPaymentsByProperties",
  async (
    params: {
      propertyIds?: string[];
      propertyId?: string;
      settled?: boolean;
      month?: number;
      year?: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/payments", {
        params: {
          property_ids: params.propertyIds,
          property_id: params.propertyId,
          settled: params.settled,
          month: params.month,
          year: params.year,
        },
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();

          if (params.property_ids) {
            params.property_ids.forEach((id: string) =>
              searchParams.append("property_ids[]", id)
            );
          }
          if (params.property_id) {
            searchParams.append("property_id", params.property_id);
          }
          if (params.settled !== undefined) {
            searchParams.append("settled", params.settled.toString());
          }
          if (params.month) {
            searchParams.append("month", params.month.toString());
          }
          if (params.year) {
            searchParams.append("year", params.year.toString());
          }

          return searchParams.toString();
        },
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
export const initiateWithdrawal = createAsyncThunk(
  "payments/initiateWithdrawal",
  async (
    {
      amount,
      withdrawal_type,
      recipient_details, // Should include { mpesa_number: string }
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
    builder.addCase(fetchPaymentsByProperties.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPaymentsByProperties.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPaymentsByProperties.rejected, (state, action) => {
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
