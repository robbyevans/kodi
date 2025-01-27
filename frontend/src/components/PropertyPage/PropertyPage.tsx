import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHouses } from "../../redux/hooks/useHouses";
import { useProperties } from "../../redux/hooks/useProperties";
import * as S from "./styles";

const PropertyPage = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { houses, getPropertyHouses, loading, error } = useHouses();
  const { getPropertyById, data } = useProperties();

  useEffect(() => {
    if (propertyId) {
      getPropertyById(Number(propertyId));
      getPropertyHouses(Number(propertyId));
    }
  }, [propertyId]);

  if (loading) return <S.LoadingMessage>Loading houses...</S.LoadingMessage>;
  if (error) return <S.ErrorMessage>{error}</S.ErrorMessage>;

  return (
    <S.PropertyPageContainer>
      <S.Header>Houses for {data[0]?.name}</S.Header>
      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <S.TableHeader>House Number</S.TableHeader>
              <S.TableHeader>Payable Rent</S.TableHeader>
              <S.TableHeader>House ID</S.TableHeader>
            </tr>
          </thead>
          <tbody>
            {houses &&
              houses.map((house) => (
                <tr key={house.id}>
                  <S.TableData>{house.house_number}</S.TableData>
                  <S.TableData>{house.payable_rent}</S.TableData>
                  <S.TableData>{house.tenant_id}</S.TableData>
                </tr>
              ))}
          </tbody>
        </S.Table>
      </S.TableContainer>
    </S.PropertyPageContainer>
  );
};

export default PropertyPage;
