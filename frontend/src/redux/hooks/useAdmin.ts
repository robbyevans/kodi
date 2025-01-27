import { useAppDispatch, useAppSelector } from "../utils";
import { loginAdmin, logoutAdmin, addAdmin } from "../slices/adminSlice";
import {
  selectCurrentAdmin,
  selectAdminRole,
  selectAdminsLoading,
  selectAdminsError,
  selectIsAdminAuthenticated,
} from "../selectors/adminSelectors";

export const useAdmins = () => {
  const dispatch = useAppDispatch();
  const currentAdmin = useAppSelector(selectCurrentAdmin);
  const role = useAppSelector(selectAdminRole);
  const loading = useAppSelector(selectAdminsLoading);
  const error = useAppSelector(selectAdminsError);
  const isAuthenticated = useAppSelector(selectIsAdminAuthenticated);

  const login = (email: string, password: string) => {
    dispatch(loginAdmin({ email, password }));
  };

  const logout = () => {
    dispatch(logoutAdmin());
  };

  const addNewAdmin = async (
    email: string,
    password: string,
    passwordConfirmation: string,
    role: string
  ) => {
    if (password !== passwordConfirmation) {
      return { success: false, message: "Passwords do not match" };
    }

    try {
      await dispatch(
        addAdmin({
          email,
          password,
          password_confirmation: passwordConfirmation,
          role,
        })
      ).unwrap();
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Failed to add admin",
      };
    }
  };

  return {
    currentAdmin,
    isAuthenticated,
    role,
    loading,
    error,
    login,
    logout,
    addNewAdmin,
  };
};
