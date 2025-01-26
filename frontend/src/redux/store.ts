import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./slices/propertiesSlice";
import housesReducer from "./slices/houseSlice";
import tenantsReducer from "./slices/tenantsSlice";
import adminsReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    houses: housesReducer,
    tenants: tenantsReducer,
    admins: adminsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
