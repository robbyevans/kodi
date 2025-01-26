import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils";
import { fetchTenants } from "../slices/tenantsSlice";
import {
  selectTenants,
  selectTenantsLoading,
  selectTenantsError,
} from "../selectors/tenantSelectors";

export const useTenants = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectTenants);
  const loading = useAppSelector(selectTenantsLoading);
  const error = useAppSelector(selectTenantsError);

  useEffect(() => {
    dispatch(fetchTenants());
  }, [dispatch]);

  return { data, loading, error };
};
