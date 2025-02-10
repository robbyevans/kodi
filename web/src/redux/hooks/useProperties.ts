import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchPropertyById,
  addProperty,
  editProperty,
  deleteProperty,
} from "../slices/propertiesSlice";
import {
  selectProperties,
  selectPropertiesLoading,
  selectPropertiesError,
} from "../selectors/propertySelectors";
import { IProperty } from "../slices/propertiesSlice";

export const useProperties = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectProperties);
  const loading = useAppSelector(selectPropertiesLoading);
  const error = useAppSelector(selectPropertiesError);

  const getPropertyById = (id: number) => {
    dispatch(fetchPropertyById(id));
  };

  const handleAddProperty = (property: Omit<IProperty, "id">) => {
    dispatch(addProperty(property));
  };
  const handleEditProperty = (property: IProperty) => {
    dispatch(editProperty(property));
  };
  const handleDeleteProperty = (propertyId: number) => {
    dispatch(deleteProperty(propertyId));
  };

  return {
    data,
    loading,
    error,
    getPropertyById,
    editProperty,
    handleEditProperty,
    handleDeleteProperty,
    handleAddProperty,
  };
};
