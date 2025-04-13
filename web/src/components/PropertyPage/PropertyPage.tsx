import React, { useState } from "react";
import * as S from "./styles";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FaHouseChimney } from "react-icons/fa6";
import { MdSimCardDownload } from "react-icons/md";
import HouseModal from "../Modals/HouseModal/HouseModal";
import AddTenantModal from "../Modals/AddTenantModal/AddTenantModal";
import PropertyPageSkeleton from "./PropertyPageSkeleton";
import { colors } from "../../styles/foundation";
import { IHouse } from "../../redux/slices/houseSlice";

interface PropertyPageProps {
  houses: IHouse[];
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

  const sortedHouses = [...houses].sort((a, b) => a.id - b.id);

  return (
    <>
      {isPropertyLoading ? (
        <PropertyPageSkeleton />
      ) : (
        <S.PropertyPageContainer>
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
                  <S.TableHeader>Payable Rent</S.TableHeader>
                  <S.TableHeader>Payable Deposit</S.TableHeader>
                  <S.TableHeader>Balance</S.TableHeader>
                  <S.TableHeader>Account Number</S.TableHeader>
                </tr>
              </thead>
              <tbody>
                {sortedHouses.map((house) => {
                  const tenant = house.tenant;
                  const agreement = house.active_tenant_house_agreements?.[0];
                  const statusDisplay = agreement?.status_label
                    ? ["Settled", "Credit"].includes(agreement.status_label)
                      ? `✅`
                      : `❌ `
                    : "Vacant";

                  return (
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
                      <S.TableData>{statusDisplay || "Vacant"}</S.TableData>
                      <S.TableData>{tenant?.name || "N/A"}</S.TableData>
                      <S.TableData>{tenant?.phone_number || "N/A"}</S.TableData>
                      <S.TableData>
                        {house.payable_rent !== null
                          ? house.payable_rent
                          : "N/A"}
                      </S.TableData>
                      <S.TableData>
                        {house.payable_deposit !== null
                          ? house.payable_deposit
                          : "N/A"}
                      </S.TableData>
                      <S.TableData>
                        {agreement?.balance !== undefined
                          ? agreement.balance
                          : "N/A"}
                      </S.TableData>
                      <S.TableData>{house.account_number || "N/A"}</S.TableData>
                    </S.TableRow>
                  );
                })}
              </tbody>
            </S.Table>
          </S.TableContainer>

          <S.ButtonContainer>
            <S.AddPropertyButton onClick={() => setIsAddHouseModalOpen(true)}>
              + Add New House
            </S.AddPropertyButton>
          </S.ButtonContainer>

          {isAddHouseModalOpen && (
            <HouseModal
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
      )}
    </>
  );
};

export default PropertyPage;
