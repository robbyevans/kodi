// File: src/redux/selectors/adminSelectors.ts
import { RootState } from "../store";

export const selectIsAdminAuthenticated = (state: RootState) =>
  Boolean(state.admin.token);

export const selectAdminsLoading = (state: RootState) => state.admin.loading;

export const selectAdminsError = (state: RootState) => state.admin.error;

export const selectCurrentAdmin = (state: RootState) => state.admin.admin;

export const selectIsAdminEmailVerified = (state: RootState) =>
  state.admin.admin.is_email_verified;
