import React, { useState } from "react";
import * as S from "./styles"; // Shorthand import for styles
import { IHouse } from "../../redux/slices/houseSlice";

import AddHouseModal from "../Modals/AddHouseModal/AddHouseModal";
import AddTenantModal from "../Modals/AddTenantModal/AddTenantModal";

interface PropertyPageProps {
  houses: IHouse[];
  loading: boolean;
  propertyId: number;
  propertyName: string;
  error: string | null;
  downloadPDF: () => void;
}

const PropertyPage: React.FC<PropertyPageProps> = ({
  houses,
  loading,
  error,
  propertyId,
  propertyName,
  downloadPDF,
}) => {
  const [isHouseModalOpen, setIsHouseModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<IHouse | null>(null);
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);

  const openTenantModal = (house: IHouse) => {
    setSelectedHouse(house);
    setIsTenantModalOpen(true);
  };

  if (loading) return <S.LoadingMessage>Loading...</S.LoadingMessage>;
  if (error)
    return <S.ErrorMessage>Error loading property data.</S.ErrorMessage>;

  return (
    <S.PropertyPageContainer>
      <S.Header>Houses for {propertyName}</S.Header>
      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <S.TableHeader>House Number</S.TableHeader>
              <S.TableHeader>Tenant Name</S.TableHeader>
              <S.TableHeader>Tenant Contact</S.TableHeader>
              <S.TableHeader>Payable Rent</S.TableHeader>
              <S.TableHeader>Rent Paid</S.TableHeader>
              <S.TableHeader>Balance</S.TableHeader>
              <S.TableHeader>Date of Payment</S.TableHeader>
              <S.TableHeader>Mode of Payment</S.TableHeader>
              <S.TableHeader>Status</S.TableHeader>
            </tr>
          </thead>
          <tbody>
            {houses.map((house) => (
              <S.TableRow key={house.id} onClick={() => openTenantModal(house)}>
                <S.TableData>{house.house_number}</S.TableData>
                <S.TableData>{house.tenant?.name || "Vacant"}</S.TableData>
                <S.TableData>
                  {house.tenant?.phone_number || "Vacant"}
                </S.TableData>
                <S.TableData>{house.payable_rent}</S.TableData>
                <S.TableData>{null}</S.TableData>
                <S.TableData>{null}</S.TableData>
                <S.TableData>{null}</S.TableData>
                <S.TableData>{null}</S.TableData>
                <S.TableData>{house.tenant ? "✅" : "❌"}</S.TableData>
              </S.TableRow>
            ))}
          </tbody>
        </S.Table>
      </S.TableContainer>
      <S.ButtonContainer>
        <S.AddPropertyButton
          onClick={() => {
            setIsHouseModalOpen(true);
          }}
        >
          Add New House
        </S.AddPropertyButton>
      </S.ButtonContainer>

      {/* House Modal */}
      {isHouseModalOpen && (
        <AddHouseModal
          isOpen={isHouseModalOpen}
          onClose={() => setIsHouseModalOpen(false)}
          propertyId={propertyId}
        />
      )}

      {/* Tenant Modal */}
      {selectedHouse && (
        <AddTenantModal
          house={selectedHouse}
          visible={isTenantModalOpen}
          onClose={() => setIsTenantModalOpen(false)}
        />
      )}

      <S.DownloadButton onClick={downloadPDF}>Download PDF</S.DownloadButton>
    </S.PropertyPageContainer>
  );
};

export default PropertyPage;
