import { useAppDispatch, useAppSelector } from "../hooks"; // Update import
import {
  fetchTenants,
  fetchPropertyTenants,
  fetchTenantById,
  fetchTenantsByHouse,
  addTenant,
  editTenant,
  deleteTenant,
  ITenant,
} from "../slices/tenantsSlice";
import {
  selectTenantsLoading,
  selectTenantsError,
  selectTenants,
} from "../selectors/tenantSelectors";

export const useTenants = () => {
  const dispatch = useAppDispatch(); // Use useAppDispatch
  const loading = useAppSelector(selectTenantsLoading); // Use useAppSelector
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

  const getTenantByHouse = (houseId: number) => {
    dispatch(fetchTenantsByHouse(houseId));
  };

  const addNewTenant = (houseId: number, tenantData: Omit<ITenant, "id">) => {
    dispatch(addTenant({ houseId, tenantData }));
  };

  const handleDeleteTenant = (tenantId: number) => {
    dispatch(deleteTenant(tenantId));
  };

  const handleEditTenant = (tenantData: ITenant) => {
    dispatch(editTenant(tenantData));
  };

  return {
    getAllTenants,
    getPropertyTenants,
    getTenantById,
    getTenantByHouse,
    addNewTenant,
    handleDeleteTenant,
    handleEditTenant,
    tenants,
    loading,
    error,
  };
};
