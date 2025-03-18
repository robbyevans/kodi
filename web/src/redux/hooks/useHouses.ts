import { useAppDispatch, useAppSelector } from "../hooks";
import { IHouse } from "../slices/houseSlice";
import {
  fetchAllHouses,
  fetchHousesByProperty,
  fetchHouseById,
  addHouse,
  editHouse,
  deleteHouse,
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
    houseData: Omit<IHouse, "id" | "property_id" | "account_number">
  ) => {
    dispatch(
      addHouse({
        propertyId,
        houseData,
      })
    );
  };

  const editHouseInProperty = (house: IHouse) => {
    dispatch(editHouse({ property_id: house.property_id, house }));
  };

  const deleteHouseFromProperty = (id: number, property_id: number) => {
    dispatch(deleteHouse({ id, property_id }));
  };

  return {
    getAllHouses,
    getHouseById,
    getHousesByProperty,
    addHouseToProperty,
    editHouseInProperty,
    deleteHouseFromProperty,
    houses,
    loading,
    error,
  };
};
