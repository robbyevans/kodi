import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";

export interface Tenant {
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
  const response = await axiosInstance.get("/tenants");
  return response.data;
});

export const fetchPropertyTenants = createAsyncThunk(
  "tenants/getPropertyTenants",
  async (propertyId: number) => {
    const response = await axiosInstance.get(
      `/tenants?property_id=${propertyId}`
    );
    return response.data;
  }
);

export const fetchTenantById = createAsyncThunk(
  "tenants/fetchById",
  async (id: number) => {
    const response = await axiosInstance.get(`/tenants/${id}`);
    return response.data;
  }
);

export const addTenant = createAsyncThunk(
  "tenants/add",
  async (tenant: Omit<Tenant, "id">) => {
    const response = await axiosInstance.post("/tenants", tenant);
    return response.data;
  }
);

export const editTenant = createAsyncThunk(
  "tenants/edit",
  async ({ id, ...tenant }: Tenant) => {
    const response = await axiosInstance.put(`/tenants/${id}`, tenant);
    return response.data;
  }
);

export const deleteTenant = createAsyncThunk(
  "tenants/delete",
  async (id: number) => {
    await axiosInstance.delete(`/tenants/${id}`);
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
      })
      .addCase(fetchPropertyTenants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertyTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPropertyTenants.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch property tenants";
      });
  },
});

export default tenantsSlice.reducer;
