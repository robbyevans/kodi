import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";
import { ITenant } from "./tenantsSlice";

export interface TenantNotificationHistory {
  id: number;
  subject: string;
  sent_at: string;
  tenants: ITenant[];
}

export interface TenantNotificationHistoryDetail
  extends TenantNotificationHistory {
  body: string;
}

interface TenantHistoryState {
  histories: TenantNotificationHistory[];
  selected?: TenantNotificationHistoryDetail;
  loading: boolean;
  error: string | null;
}

const initialState: TenantHistoryState = {
  histories: [],
  selected: undefined,
  loading: false,
  error: null,
};

export const fetchHistories = createAsyncThunk<
  TenantNotificationHistory[],
  void,
  { rejectValue: string }
>("history/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get("/tenant_notification_histories");
    return data as TenantNotificationHistory[];
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const fetchHistory = createAsyncThunk<
  TenantNotificationHistoryDetail,
  number,
  { rejectValue: string }
>("history/fetchOne", async (id, { rejectWithValue }) => {
  try {
    const { data } = await axiosInstance.get(
      `/tenant_notification_histories/${id}`
    );
    return data as TenantNotificationHistoryDetail;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const slice = createSlice({
  name: "tenantNotificationHistory",
  initialState,
  reducers: {
    clearSelected(state) {
      state.selected = undefined;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch all
      .addCase(fetchHistories.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchHistories.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.histories = payload;
      })
      .addCase(fetchHistories.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload ?? "Failed to load history";
      })
      // fetch one
      .addCase(fetchHistory.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchHistory.fulfilled, (s, { payload }) => {
        s.loading = false;
        s.selected = payload;
      })
      .addCase(fetchHistory.rejected, (s, { payload }) => {
        s.loading = false;
        s.error = payload ?? "Failed to load entry";
      });
  },
});

export const { clearSelected } = slice.actions;
export default slice.reducer;
