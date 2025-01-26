import { RootState } from "../store";

export const selectIsAdminAuthenticated = (state: RootState) =>
  state.admins.isAuthenticated;
export const selectAdminsLoading = (state: RootState) => state.admins.loading;
export const selectAdminsError = (state: RootState) => state.admins.error;
