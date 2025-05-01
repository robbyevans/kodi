import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./slices/propertiesSlice";
import housesReducer from "./slices/houseSlice";
import tenantsReducer from "./slices/tenantsSlice";
import adminsReducer from "./slices/adminSlice";
import toastReducer from "./slices/toastSlice";
import paymentReducer from "./slices/paymentSlice";
import notificationReducer from "./slices/notificationSlice";
import tenantNotificationReducer from "./slices/tenantNotificationSlice";
import emailConfirmationReducer from "./slices/emailConfirmationSlice";
import passwordResetReducer from "./slices/passwordResetSlice";

const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    houses: housesReducer,
    tenants: tenantsReducer,
    admin: adminsReducer,
    payments: paymentReducer,
    toast: toastReducer,
    emailConfirmation: emailConfirmationReducer,
    notifications: notificationReducer,
    tenantNotifications: tenantNotificationReducer,
    passwordReset: passwordResetReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
