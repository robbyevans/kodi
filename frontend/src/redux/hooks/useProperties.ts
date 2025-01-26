import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils";
import { fetchProperties } from "../slices/propertiesSlice";
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

  return { data, loading, error };
};
