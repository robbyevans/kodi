// File 2: /frontend/src/redux/hooks/useAdmin.ts

import { useAppDispatch, useAppSelector } from "../utils";
import { loginAdmin, logoutAdmin, signupAdmin } from "../slices/adminSlice";
import {
  selectIsAdminAuthenticated,
  selectAdminsLoading,
  selectAdminsError,
} from "../selectors/adminSelectors";

export const useAdmins = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAdminAuthenticated);
  const loading = useAppSelector(selectAdminsLoading);
  const error = useAppSelector(selectAdminsError);

  const login = (email: string, password: string) => {
    dispatch(loginAdmin({ email, password }));
  };

  const signup = async (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    if (password !== passwordConfirmation) {
      return { success: false, message: "Passwords do not match" };
    }
    try {
      await dispatch(
        signupAdmin({
          email,
          password,
          password_confirmation: passwordConfirmation,
        })
      ).unwrap(); // Ensures errors are properly caught
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.message || "Signup failed" };
    }
  };

  const logout = () => {
    dispatch(logoutAdmin());
  };

  return { isAuthenticated, loading, error, login, signup, logout };
};
