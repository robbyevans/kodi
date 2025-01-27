import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils";

export interface House {
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

// Thunks
export const fetchHouses = createAsyncThunk("houses/fetchAll", async () => {
  const response = await axiosInstance.get("/houses");
  return response.data;
});

export const fetchPropertyHouses = createAsyncThunk(
  "houses/getPropertyHouses",
  async (propertyId: number) => {
    const response = await axiosInstance.get(
      `/houses?property_id=${propertyId}`
    );
    return response.data;
  }
);

export const fetchHouseById = createAsyncThunk(
  "houses/fetchById",
  async (id: number) => {
    const response = await axiosInstance.get(`/houses/${id}`);
    return response.data;
  }
);

export const addHouse = createAsyncThunk(
  "houses/add",
  async (house: Omit<House, "id">) => {
    const response = await axiosInstance.post("/houses", house);
    return response.data;
  }
);

export const editHouse = createAsyncThunk(
  "houses/edit",
  async ({ id, ...house }: House) => {
    const response = await axiosInstance.put(`/houses/${id}`, house);
    return response.data;
  }
);

export const deleteHouse = createAsyncThunk(
  "houses/delete",
  async (id: number) => {
    await axiosInstance.delete(`/houses/${id}`);
    return id;
  }
);

// Slice
const housesSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch houses";
      })
      .addCase(fetchHouseById.fulfilled, (state, action) => {
        state.data = state.data.map((house) =>
          house.id === action.payload.id ? action.payload : house
        );
      })
      .addCase(addHouse.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editHouse.fulfilled, (state, action) => {
        state.data = state.data.map((house) =>
          house.id === action.payload.id ? action.payload : house
        );
      })
      .addCase(deleteHouse.fulfilled, (state, action) => {
        state.data = state.data.filter((house) => house.id !== action.payload);
      })
      .addCase(fetchPropertyHouses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPropertyHouses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPropertyHouses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch houses";
      });
  },
});

export default housesSlice.reducer;
