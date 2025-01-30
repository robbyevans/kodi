import { useAppDispatch, useAppSelector } from "../hooks"; // Update import
import { fetchPropertyById, addProperty } from "../slices/propertiesSlice";
import {
  selectProperties,
  selectPropertiesLoading,
  selectPropertiesError,
} from "../selectors/propertySelectors";
import { IProperty } from "../slices/propertiesSlice";

export const useProperties = () => {
  const dispatch = useAppDispatch(); // Use useAppDispatch
  const data = useAppSelector(selectProperties); // Use useAppSelector
  const loading = useAppSelector(selectPropertiesLoading);
  const error = useAppSelector(selectPropertiesError);

  const getPropertyById = (id: number) => {
    dispatch(fetchPropertyById(id));
  };

  const addNewProperty = (property: IProperty) => {
    dispatch(addProperty(property));
  };

  return { data, loading, error, getPropertyById, addProperty: addNewProperty };
};
