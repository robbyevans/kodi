import { useAppDispatch, useAppSelector } from "../utils";
import {
  fetchHouses,
  fetchPropertyHouses,
  fetchHouseById,
} from "../slices/houseSlice";
import {
  selectHousesLoading,
  selectHousesError,
  selectHouses,
} from "../selectors/houseSelector";

export const useHouses = () => {
  const dispatch = useAppDispatch();
  const houses = useAppSelector(selectHouses);
  const loading = useAppSelector(selectHousesLoading);
  const error = useAppSelector(selectHousesError);

  const getAllHouses = () => {
    dispatch(fetchHouses());
  };

  const getPropertyHouses = (propertyId: number) => {
    dispatch(fetchPropertyHouses(propertyId));
  };

  const getHouseById = (id: number) => {
    dispatch(fetchHouseById(id));
  };

  return {
    getAllHouses,
    getHouseById,
    getPropertyHouses,
    houses,
    loading,
    error,
  };
};
