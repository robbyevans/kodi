import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Tenant {
  id: number;
  name: string;
  email: string;
}

interface TenantsState {
  data: Tenant[];
  loading: boolean;
  error: string | null;
}

const initialState: TenantsState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTenants = createAsyncThunk(
  "tenants/fetchTenants",
  async () => {
    const response = await axios.get("/tenants");
    return response.data;
  }
);

const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tenants";
      });
  },
});

export default tenantsSlice.reducer;
