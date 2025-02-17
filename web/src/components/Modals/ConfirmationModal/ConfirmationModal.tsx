import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import * as S from "./styles";
import { ModalOverlay } from "../../../styles/foundation";

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
  const [preText, propertyName, postText] =
    message.split(/(Deleting .*? will)/);

  return (
    <ModalOverlay $isBlury>
      <S.ModalContainer>
        <S.ModalHeader>
          <RiErrorWarningLine size="65px" />
          <S.ModalTitle>Are you sure?</S.ModalTitle>
        </S.ModalHeader>
        <S.ModalMessage>
          {preText}
          <S.BoldText>{propertyName}</S.BoldText>
          {postText}
        </S.ModalMessage>
        <S.ModalActions>
          <S.ConfirmButton onClick={onConfirm}>Delete</S.ConfirmButton>
          <S.CancelButton onClick={onCancel}>Cancel</S.CancelButton>
        </S.ModalActions>
      </S.ModalContainer>
    </ModalOverlay>
  );
};

export default ConfirmationModal;
