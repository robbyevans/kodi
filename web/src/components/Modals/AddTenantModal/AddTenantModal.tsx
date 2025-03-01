import React, { useEffect, useState } from "react";
import { ITenant } from "../../../redux/slices/tenantsSlice";
import { useTenants } from "../../../redux/hooks/useTenants";
import { IHouse } from "../../../redux/slices/houseSlice";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import * as S from "./styles";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

interface AddTenantModalProps {
  house: IHouse;
  visible: boolean;
  onClose: () => void;
}

const AddTenantModal: React.FC<AddTenantModalProps> = ({
  house,
  visible,
  onClose,
}) => {
  const {
    tenants,
    getTenantByHouse,
    addNewTenant,
    handleDeleteTenant,
    handleEditTenant,
    loading,
  } = useTenants();

  const [tenantName, setTenantName] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [tenantNationalId, setTenantNationalId] = useState("");
  // houseDepositPaid is optional so we allow null values.
  const [houseDepositPaid, setHouseDepositPaid] = useState<number | null>(null);
  const [editingTenant, setEditingTenant] = useState<ITenant | null>(null);

  useEffect(() => {
    if (visible) {
      getTenantByHouse(house.id);
      resetForm();
    }
  }, [visible, house.id]);

  const resetForm = () => {
    setTenantName("");
    setTenantEmail("");
    setTenantPhone("");
    setTenantNationalId("");
    setHouseDepositPaid(null);
    setEditingTenant(null);
  };

  const handleSubmit = () => {
    // Note: houseDepositPaid is optional, so it's not required in the validation.
    if (!tenantName || !tenantEmail || !tenantPhone || !tenantNationalId) {
      alert("All fields except deposit are required.");
      return;
    }

    if (editingTenant) {
      handleEditTenant(house.id, {
        id: editingTenant.id,
        name: tenantName,
        email: tenantEmail,
        phone_number: tenantPhone,
        national_id: tenantNationalId,
        house_deposit_paid: houseDepositPaid,
      });
    } else {
      addNewTenant(house.id, {
        name: tenantName,
        email: tenantEmail,
        phone_number: tenantPhone,
        national_id: tenantNationalId,
        house_deposit_paid: houseDepositPaid,
      });
    }
    resetForm();
  };

  if (!visible) return null;

  const hasTenant = tenants && tenants.length > 0;

  return (
    <ModalOverlay>
      <S.ModalContent>
        <S.ModalHeader>
          <S.CloseButton onClick={onClose}>
            <IoClose size={20} color="red" />
          </S.CloseButton>
          {editingTenant
            ? `Edit Tenant - ${editingTenant.name}`
            : hasTenant
            ? `Tenant for House ${house.house_number}`
            : `Add Tenant to ${house.house_number}`}
        </S.ModalHeader>

        {!hasTenant || editingTenant ? (
          // Display the input form when adding a new tenant or editing an existing tenant.
          <S.FormContainer>
            <S.InputField
              placeholder="Full Names"
              value={tenantName}
              onChange={(e) => setTenantName(e.target.value)}
            />
            <S.InputField
              placeholder="Email Address"
              value={tenantEmail}
              onChange={(e) => setTenantEmail(e.target.value)}
            />
            <S.InputField
              placeholder="Phone Number"
              value={tenantPhone}
              onChange={(e) => setTenantPhone(e.target.value)}
            />
            <S.InputField
              placeholder="National ID"
              value={tenantNationalId}
              onChange={(e) => setTenantNationalId(e.target.value)}
            />
            <S.InputField
              type="number"
              placeholder="House Deposit Paid"
              // Convert null to empty string for input display
              value={houseDepositPaid !== null ? houseDepositPaid : ""}
              onChange={(e) =>
                setHouseDepositPaid(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
            />
            <S.ButtonContainer>
              <S.CancelButton onClick={onClose}>Cancel</S.CancelButton>
              <S.SubmitButton onClick={handleSubmit}>
                {editingTenant ? "Save Changes" : "Add Tenant"}
              </S.SubmitButton>
            </S.ButtonContainer>
          </S.FormContainer>
        ) : (
          // Display the existing tenant details when a tenant exists and we're not editing.
          <>
            {loading ? (
              <S.StatusMessage>Loading...</S.StatusMessage>
            ) : (
              <S.TenantList>
                {tenants.map((tenant: ITenant) => (
                  <S.TenantItem key={tenant.id}>
                    <div>
                      <S.TenantName>{tenant.name}</S.TenantName>
                      <S.TenantDetails>
                        {tenant.email} | {tenant.phone_number} |{" "}
                        {tenant.national_id} |{" "}
                        {tenant.house_deposit_paid !== undefined &&
                        tenant.house_deposit_paid !== null
                          ? tenant.house_deposit_paid
                          : "Not provided"}
                      </S.TenantDetails>
                    </div>
                    <S.TenantActions>
                      <S.EditButton
                        onClick={() => {
                          setEditingTenant(tenant);
                          setTenantName(tenant.name);
                          setTenantEmail(tenant.email);
                          setTenantPhone(tenant.phone_number);
                          setTenantNationalId(tenant.national_id);
                          setHouseDepositPaid(
                            tenant.house_deposit_paid ?? null
                          );
                        }}
                      >
                        <FiEdit />
                      </S.EditButton>
                      <S.DeleteButton
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this tenant?"
                            )
                          ) {
                            handleDeleteTenant(house.id, tenant.id);
                          }
                        }}
                      >
                        <FiTrash2 />
                      </S.DeleteButton>
                    </S.TenantActions>
                  </S.TenantItem>
                ))}
              </S.TenantList>
            )}
          </>
        )}
      </S.ModalContent>
    </ModalOverlay>
  );
};

export default AddTenantModal;
