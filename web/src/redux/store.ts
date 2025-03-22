import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./slices/propertiesSlice";
import housesReducer from "./slices/houseSlice";
import tenantsReducer from "./slices/tenantsSlice";
import adminsReducer from "./slices/adminSlice";
import toastReducer from "./slices/toastSlice";
import paymentReducer from "./slices/paymentSlice";
import notificationReducer from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    houses: housesReducer,
    tenants: tenantsReducer,
    admins: adminsReducer,
    payments: paymentReducer,
    toast: toastReducer,
    notifications: notificationReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
