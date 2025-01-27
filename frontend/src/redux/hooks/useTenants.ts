import { useAppDispatch, useAppSelector } from "../utils";
import {
  fetchTenants,
  fetchPropertyTenants,
  fetchTenantById,
} from "../slices/tenantsSlice";
import {
  selectTenantsLoading,
  selectTenantsError,
  selectTenants,
} from "../selectors/tenantSelectors";

export const useTenants = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectTenantsLoading);
  const tenants = useAppSelector(selectTenants);
  const error = useAppSelector(selectTenantsError);

  const getAllTenants = () => {
    dispatch(fetchTenants());
  };

  const getPropertyTenants = (propertyId: number) => {
    dispatch(fetchPropertyTenants(propertyId));
  };

  const getTenantById = (id: number) => {
    dispatch(fetchTenantById(id));
  };

  return {
    getAllTenants,
    getPropertyTenants,
    getTenantById,
    tenants,
    loading,
    error,
  };
};
