import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  width: 450px;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalHeader = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    outline: none;

    &:focus {
      border-color: #007bff;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
`;

export const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #0056b3;
  }
`;

export const CancelButton = styled.button`
  background: #ccc;
  color: black;
  padding: 10px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #999;
  }
`;

export const TenantList = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TenantItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 5px;
`;

export const TenantActions = styled.div`
  display: flex;
  gap: 8px;

  button {
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }

    &.danger {
      color: #ff4d4f;
    }
  }
`;
