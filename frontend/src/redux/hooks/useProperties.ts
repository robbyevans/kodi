import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchPropertyById, addProperty } from "../slices/propertiesSlice";
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

  const addNewProperty = (property: Omit<IProperty, "id">) => {
    dispatch(addProperty(property));
  };

  return { data, loading, error, getPropertyById, addProperty: addNewProperty };
};
