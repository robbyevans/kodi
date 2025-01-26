import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async () => {
    const response = await axios.get("/properties");
    return response.data;
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch properties";
      });
  },
});

export default propertiesSlice.reducer;
