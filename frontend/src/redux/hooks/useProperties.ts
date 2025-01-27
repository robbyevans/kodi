import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils";
import { fetchProperties, fetchPropertyById } from "../slices/propertiesSlice";
import {
  selectProperties,
  selectPropertiesLoading,
  selectPropertiesError,
} from "../selectors/propertySelectors";

export const useProperties = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectProperties);
  const loading = useAppSelector(selectPropertiesLoading);
  const error = useAppSelector(selectPropertiesError);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const getPropertyById = (id: number) => {
    dispatch(fetchPropertyById(id));
  };

  return { data, loading, error, getPropertyById };
};
