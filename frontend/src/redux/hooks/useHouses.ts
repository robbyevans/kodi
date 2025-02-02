import { useAppDispatch, useAppSelector } from "../hooks"; // Update import
import { IHouse } from "../slices/houseSlice";
import {
  fetchAllHouses,
  fetchHousesByProperty,
  fetchHouseById,
  addHouse,
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
    dispatch(fetchAllHouses());
  };

  const getHousesByProperty = (propertyId: number) => {
    dispatch(fetchHousesByProperty(propertyId));
  };

  const getHouseById = (id: number) => {
    dispatch(fetchHouseById(id));
  };

  const addHouseToProperty = (
    propertyId: number,
    houseData: Omit<IHouse, "id" | "property_id">
  ) => {
    dispatch(
      addHouse({
        propertyId,
        houseData,
      })
    );
  };

  return {
    getAllHouses,
    getHouseById,
    getHousesByProperty,
    addHouseToProperty,
    houses,
    loading,
    error,
  };
};
