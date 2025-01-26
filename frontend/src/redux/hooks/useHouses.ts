import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../utils";
import { fetchHouses } from "../slices/houseSlice";
import {
  selectHouses,
  selectHousesLoading,
  selectHousesError,
} from "../selectors/houseSelector";

export const useHouses = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectHouses);
  const loading = useAppSelector(selectHousesLoading);
  const error = useAppSelector(selectHousesError);

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  return { data, loading, error };
};
