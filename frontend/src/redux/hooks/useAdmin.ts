import { useAppDispatch, useAppSelector } from "../utils";
import { loginAdmin, logoutAdmin } from "../slices/adminSlice";
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

  const logout = () => {
    dispatch(logoutAdmin());
  };

  return { isAuthenticated, loading, error, login, logout };
};
