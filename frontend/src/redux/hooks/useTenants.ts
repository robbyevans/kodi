import { useAppDispatch, useAppSelector } from "../hooks"; // Update import
import {
  fetchAllTenants,
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
  selectAllTenants,
} from "../selectors/tenantSelectors";

export const useTenants = () => {
  const dispatch = useAppDispatch(); // Use useAppDispatch
  const loading = useAppSelector(selectTenantsLoading); // Use useAppSelector
  const tenants = useAppSelector(selectAllTenants);
  const error = useAppSelector(selectTenantsError);

  const getAllTenants = () => {
    dispatch(fetchAllTenants());
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

  const handleDeleteTenant = (houseId: number, tenantId: number) => {
    dispatch(deleteTenant({ houseId, tenantId }));
  };

  const handleEditTenant = (houseId: number, tenantData: ITenant) => {
    dispatch(editTenant({ houseId, tenantData }));
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
