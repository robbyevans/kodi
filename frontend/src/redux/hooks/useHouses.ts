import { useAppDispatch, useAppSelector } from "../hooks"; // Update import
import {
  fetchHouses,
  fetchHousesByProperty,
  fetchHouseById,
} from "../slices/houseSlice";
import {
  selectHousesLoading,
  selectHousesError,
  selectHouses,
} from "../selectors/houseSelector";

export const useHouses = () => {
  const dispatch = useAppDispatch(); // Use useAppDispatch
  const houses = useAppSelector(selectHouses); // Use useAppSelector
  const loading = useAppSelector(selectHousesLoading);
  const error = useAppSelector(selectHousesError);

  const getAllHouses = () => {
    dispatch(fetchHouses());
  };

  const getHousesByProperty = (propertyId: number) => {
    dispatch(fetchHousesByProperty(propertyId));
  };

  const getHouseById = (id: number) => {
    dispatch(fetchHouseById(id));
  };

  return {
    getAllHouses,
    getHouseById,
    getHousesByProperty,
    houses,
    loading,
    error,
  };
};
