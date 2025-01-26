import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";

interface Property {
  id: number;
  name: string;
}

interface PropertiesState {
  data: Property[];
  loading: boolean;
  error: string | null;
}

const initialState: PropertiesState = {
  data: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchProperties = createAsyncThunk(
  "properties/fetchAll",
  async () => {
    const response = await axiosInstance.get("/properties");
    return response.data;
  }
);

export const fetchPropertyById = createAsyncThunk(
  "properties/fetchById",
  async (id: number) => {
    const response = await axiosInstance.get(`/properties/${id}`);
    return response.data;
  }
);

export const addProperty = createAsyncThunk(
  "properties/add",
  async (property: Omit<Property, "id">) => {
    const response = await axiosInstance.post("/properties", property);
    return response.data;
  }
);

export const editProperty = createAsyncThunk(
  "properties/edit",
  async ({ id, ...property }: Property) => {
    const response = await axiosInstance.put(`/properties/${id}`, property);
    return response.data;
  }
);

export const deleteProperty = createAsyncThunk(
  "properties/delete",
  async (id: number) => {
    await axiosInstance.delete(`/properties/${id}`);
    return id;
  }
);

// Slice
const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch properties";
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.data = state.data.map((property) =>
          property.id === action.payload.id ? action.payload : property
        );
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editProperty.fulfilled, (state, action) => {
        state.data = state.data.map((property) =>
          property.id === action.payload.id ? action.payload : property
        );
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (property) => property.id !== action.payload
        );
      });
  },
});

export default propertiesSlice.reducer;
