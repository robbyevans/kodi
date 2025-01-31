import { useAppDispatch, useAppSelector } from "../utils";
import { loginAdmin, logoutAdmin, addAdmin } from "../slices/adminSlice";
import {
  selectCurrentAdmin,
  selectAdminsLoading,
  selectAdminsError,
  selectIsAdminAuthenticated,
} from "../selectors/adminSelectors";

export const useAdmins = () => {
  const dispatch = useAppDispatch();
  const currentAdmin = useAppSelector(selectCurrentAdmin);
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
      const response = await dispatch(
        addAdmin({
          email,
          password,
          password_confirmation: passwordConfirmation,
          role,
        })
      ).unwrap();
      return { success: true, admin_id: response.admin_id };
    } catch (error) {
      if (error instanceof Error) {
        return {
          success: false,
          message: error.message || "Failed to add admin",
        };
      }
    }
  };

  return {
    currentAdmin,
    isAuthenticated,
    loading,
    error,
    login,
    logout,
    addNewAdmin,
  };
};
