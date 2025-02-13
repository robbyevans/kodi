import React, { useState } from "react";
import * as S from "./styles";
import { IHouse } from "../../redux/slices/houseSlice";
import AddHouseModal from "../Modals/AddHouseModal/AddHouseModal";
import AddTenantModal from "../Modals/AddTenantModal/AddTenantModal";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdSimCardDownload } from "react-icons/md";
import { colors } from "../../styles/foundation";
import { TbSquareChevronRightFilled } from "react-icons/tb";
import EditHouseModal from "../Modals/EditHouseModal/EditHouseModal";

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
  const [isAddHouseModalOpen, setIsAddHouseModalOpen] = useState(false);
  const [isEditHouseModalOpen, setIsEditHouseModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<IHouse | null>(null);
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);

  const openTenantModal = (house: IHouse) => {
    setSelectedHouse(house);
    setIsTenantModalOpen(true);
  };

  const handleClickEdit = (e: React.MouseEvent<SVGElement>, house: IHouse) => {
    e.stopPropagation();
    setSelectedHouse(house);
    setIsEditHouseModalOpen(true);
  };

  if (loading) return <S.LoadingMessage>Loading...</S.LoadingMessage>;
  if (error)
    return <S.ErrorMessage>Error loading property data.</S.ErrorMessage>;

  return (
    <S.PropertyPageContainer data-test="property-page-container">
      <S.DownloadWRapper>
        <MdSimCardDownload
          size="30px"
          onClick={downloadPDF}
          color={colors.primary}
        />
      </S.DownloadWRapper>

      <S.Header>Houses for {propertyName}</S.Header>
      <S.TableContainer>
        <S.Table>
          <thead>
            <tr>
              <S.TableHeader>House Number</S.TableHeader>
              <S.TableHeader>Tenant Name</S.TableHeader>
              <S.TableHeader>Tenant Contact</S.TableHeader>
              <S.TableHeader>Payable Deposit</S.TableHeader>
              <S.TableHeader>Deposit Paid</S.TableHeader>
              <S.TableHeader>Deposit Balance</S.TableHeader>
              <S.TableHeader>Payable Rent</S.TableHeader>
              <S.TableHeader>Rent Paid</S.TableHeader>
              <S.TableHeader>Balance</S.TableHeader>
              <S.TableHeader>Date of Payment</S.TableHeader>
              <S.TableHeader>Mode of Payment</S.TableHeader>
              <S.TableHeader>Status</S.TableHeader>
            </tr>
          </thead>
          <tbody>
            {houses
              .slice()
              .sort((a, b) => a.id - b.id)
              .map((house) => (
                <S.TableRow
                  key={house.id}
                  onClick={() => openTenantModal(house)}
                >
                  <S.TableData>
                    <S.IconTableData>
                      <HiOutlineDotsVertical
                        width="25px"
                        height="25px"
                        onClick={(e) => handleClickEdit(e, house)}
                      />
                      <TbSquareChevronRightFilled color={colors.primary} />
                      {house.house_number}
                    </S.IconTableData>
                  </S.TableData>
                  <S.TableData>{house.tenant?.name || "Vacant"}</S.TableData>
                  <S.TableData>
                    {house.tenant?.phone_number || "Vacant"}
                  </S.TableData>
                  <S.TableData>{house.payable_deposit || "N/A"}</S.TableData>
                  <S.TableData>
                    {house.tenant?.house_deposit_paid != null
                      ? house.tenant.house_deposit_paid
                      : "N/A"}
                  </S.TableData>
                  <S.TableData>
                    {house.payable_deposit != null
                      ? house.payable_deposit -
                        (house.tenant?.house_deposit_paid ?? 0)
                      : "N/A"}
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
        <S.AddPropertyButton onClick={() => setIsAddHouseModalOpen(true)}>
          + Add New House
        </S.AddPropertyButton>
      </S.ButtonContainer>

      {isAddHouseModalOpen && (
        <AddHouseModal
          isOpen={isAddHouseModalOpen}
          onClose={() => setIsAddHouseModalOpen(false)}
          propertyId={propertyId}
        />
      )}

      {selectedHouse && (
        <AddTenantModal
          house={selectedHouse}
          visible={isTenantModalOpen}
          onClose={() => setIsTenantModalOpen(false)}
        />
      )}

      {/* Render EditHouseModal only once */}
      {isEditHouseModalOpen && selectedHouse && (
        <EditHouseModal
          house={selectedHouse}
          propertyId={propertyId}
          onClose={() => {
            setIsEditHouseModalOpen(false);
            setSelectedHouse(null);
          }}
          isOpen={isEditHouseModalOpen}
        />
      )}
    </S.PropertyPageContainer>
  );
};

export default PropertyPage;
