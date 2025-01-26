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

// Thunks
export const fetchTenants = createAsyncThunk("tenants/fetchAll", async () => {
  const response = await axios.get("/tenants");
  return response.data;
});

export const fetchTenantById = createAsyncThunk(
  "tenants/fetchById",
  async (id: number) => {
    const response = await axios.get(`/tenants/${id}`);
    return response.data;
  }
);

export const addTenant = createAsyncThunk(
  "tenants/add",
  async (tenant: Omit<Tenant, "id">) => {
    const response = await axios.post("/tenants", tenant);
    return response.data;
  }
);

export const editTenant = createAsyncThunk(
  "tenants/edit",
  async ({ id, ...tenant }: Tenant) => {
    const response = await axios.put(`/tenants/${id}`, tenant);
    return response.data;
  }
);

export const deleteTenant = createAsyncThunk(
  "tenants/delete",
  async (id: number) => {
    await axios.delete(`/tenants/${id}`);
    return id;
  }
);

// Slice
const tenantsSlice = createSlice({
  name: "tenants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tenants";
      })
      .addCase(fetchTenantById.fulfilled, (state, action) => {
        state.data = state.data.map((tenant) =>
          tenant.id === action.payload.id ? action.payload : tenant
        );
      })
      .addCase(addTenant.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editTenant.fulfilled, (state, action) => {
        state.data = state.data.map((tenant) =>
          tenant.id === action.payload.id ? action.payload : tenant
        );
      })
      .addCase(deleteTenant.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (tenant) => tenant.id !== action.payload
        );
      });
  },
});

export default tenantsSlice.reducer;
