import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface House {
  id: number;
  house_number: string;
  payable_rent: number;
  tenant_id: number;
  property_id: number;
}

interface HousesState {
  data: House[];
  loading: boolean;
  error: string | null;
}

const initialState: HousesState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchHouses = createAsyncThunk("houses/fetchHouses", async () => {
  const response = await axios.get("/houses");
  return response.data;
});

const housesSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch houses";
      });
  },
});

export default housesSlice.reducer;
