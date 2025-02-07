import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import * as S from "./styles";

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.ModalHeader>
          <RiErrorWarningLine size="65px" />
          <S.ModalTitle>Are you sure ?</S.ModalTitle>
        </S.ModalHeader>
        <S.ModalMessage>{message}</S.ModalMessage>
        <S.ModalActions>
          <S.ConfirmButton onClick={onConfirm}>Delete</S.ConfirmButton>
          <S.CancelButton onClick={onCancel}>Cancel</S.CancelButton>
        </S.ModalActions>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default ConfirmationModal;
