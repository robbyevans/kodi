import React, { useState } from "react";
import * as S from "./styles";
import { IHouse } from "../../redux/slices/houseSlice";
import HouseModal from "../Modals/HouseModal/HouseModal";
import AddTenantModal from "../Modals/AddTenantModal/AddTenantModal";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaHouseChimney } from "react-icons/fa6";
import { MdSimCardDownload } from "react-icons/md";
import PropertyPageSkeleton from "./PropertyPageSkeleton";
import { colors } from "../../styles/foundation";

interface ComputedHouse extends IHouse {
  rentPaid?: number;
  balance?: number;
  paymentDate?: Date | null;
  paymentMode?: string | null;
  paymentStatus?: string;
}

interface PropertyPageProps {
  houses: ComputedHouse[];
  isPropertyLoading: boolean;
  propertyId: number;
  propertyName: string;
  error: string | null;
  downloadPDF: () => void;
}

const PropertyPage: React.FC<PropertyPageProps> = ({
  houses,
  isPropertyLoading,
  propertyId,
  propertyName,
  downloadPDF,
  // error,
}) => {
  const [isAddHouseModalOpen, setIsAddHouseModalOpen] = useState(false);
  const [isEditHouseModalOpen, setIsEditHouseModalOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<ComputedHouse | null>(
    null
  );
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);

  const openTenantModal = (house: ComputedHouse) => {
    setSelectedHouse(house);
    setIsTenantModalOpen(true);
  };

  const handleClickEdit = (
    e: React.MouseEvent<SVGElement>,
    house: ComputedHouse
  ) => {
    e.stopPropagation();
    setSelectedHouse(house);
    setIsEditHouseModalOpen(true);
  };

  // Sort houses in ascending order by house.id
  const sortedHouses = [...houses].sort((a, b) => a.id - b.id);

  return (
    <>
      {isPropertyLoading && <PropertyPageSkeleton />}
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
                <S.TableHeader>Status</S.TableHeader>
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
                <S.TableHeader>Account Number</S.TableHeader>
              </tr>
            </thead>
            <tbody>
              {sortedHouses.map((house) => (
                <S.TableRow
                  key={house.id}
                  onClick={() => openTenantModal(house)}
                >
                  <S.TableData>
                    <S.IconTableData>
                      <HiOutlineDotsVertical
                        size="25px"
                        onClick={(e) => handleClickEdit(e, house)}
                      />
                      <FaHouseChimney color={colors.primary} />
                      {house.house_number}
                    </S.IconTableData>
                  </S.TableData>
                  <S.TableData>{house.paymentStatus || "N/A"}</S.TableData>
                  <S.TableData>{house.tenant?.name || "Vacant"}</S.TableData>
                  <S.TableData>
                    {house.tenant?.phone_number || "N/A"}
                  </S.TableData>
                  <S.TableData>{house.payable_deposit || "N/A"}</S.TableData>
                  <S.TableData>
                    {house.tenant?.house_deposit_paid != null
                      ? house.tenant.house_deposit_paid
                      : "N/A"}
                  </S.TableData>
                  <S.TableData>
                    {house.payable_deposit != null &&
                    house.tenant?.house_deposit_paid != null
                      ? house.payable_deposit - house.tenant.house_deposit_paid
                      : "N/A"}
                  </S.TableData>
                  <S.TableData>{house.payable_rent || "N/A"}</S.TableData>
                  <S.TableData>{house.rentPaid || "N/A"}</S.TableData>
                  <S.TableData>{house.balance || "NILL"}</S.TableData>
                  <S.TableData>
                    {house.paymentDate
                      ? house.paymentDate.toLocaleDateString()
                      : "N/A"}
                  </S.TableData>
                  <S.TableData>{house.paymentMode || "N/A"}</S.TableData>
                  <S.TableData>{house.paymentStatus || "N/A"}</S.TableData>
                  <S.TableData>{house.account_number || "N/A"}</S.TableData>
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

        {/* HouseModal for adding a new house */}
        {isAddHouseModalOpen && (
          <HouseModal
            isOpen={isAddHouseModalOpen}
            onClose={() => setIsAddHouseModalOpen(false)}
            propertyId={propertyId}
          />
        )}

        {/* AddTenantModal for adding tenant info or viewing payment history */}
        {selectedHouse && (
          <AddTenantModal
            house={selectedHouse}
            visible={isTenantModalOpen}
            onClose={() => setIsTenantModalOpen(false)}
          />
        )}

        {/* HouseModal for editing an existing house */}
        {isEditHouseModalOpen && selectedHouse && (
          <HouseModal
            isOpen={isEditHouseModalOpen}
            onClose={() => {
              setIsEditHouseModalOpen(false);
              setSelectedHouse(null);
            }}
            propertyId={propertyId}
            isVariantEditHouse
            house={selectedHouse}
          />
        )}
      </S.PropertyPageContainer>
    </>
  );
};

export default PropertyPage;
