import styled from "styled-components";
import {
  colors,
  spacing,
  fontSizes,
  borderRadius,
  shadows,
} from "../../styles/foundation";

export const Container = styled.div`
  height: 100%;
  max-width: 600px;
  margin: ${spacing["2xl"]} auto;
  padding: ${spacing.xl};
  background: ${colors.background};
  border-radius: ${borderRadius.md};
  box-shadow: ${shadows.md};
`;

export const Header = styled.h1`
  font-size: ${fontSizes["2xl"]};
  color: ${colors.primary};
  text-align: center;
  margin-bottom: ${spacing.lg};
`;

export const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
`;

export const TextInput = styled.input`
  flex: 1;
  padding: ${spacing.sm};
  font-size: ${fontSizes.md};
  border: 1px solid ${colors.neutral[300]};
  border-radius: ${borderRadius.sm};
`;

export const AddButton = styled.button`
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${fontSizes.md};
  background: ${colors.primary};
  color: ${colors.text.inverted};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;

  &:disabled {
    background: ${colors.neutral[300]};
    cursor: not-allowed;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.sm} ${spacing.md};
  border: 1px solid ${colors.primary};
  border-left: 5px solid ${colors.primary};
  border-radius: 5px;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  font-size: ${fontSizes.lg};
  cursor: pointer;
  color: ${colors.primary};

  &:hover {
    color: ${colors.accent};
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: ${colors.background};
  border-radius: ${borderRadius.md};
  padding: ${spacing.lg};
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${shadows.lg};
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};

  @media (max-width: 480px) {
    padding: ${spacing.md};
    max-height: 70vh;
  }
`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: ${spacing.md};
  h2 {
    margin: 0;
    font-size: ${fontSizes.xl};
    color: ${colors.text.primary};
  }
  p {
    margin: ${spacing.xs} 0 0;
    font-size: ${fontSizes.sm};
    color: ${colors.text.secondary};
  }
`;

export const Flags = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.lg};
`;

export const FlagLabel = styled.label`
  font-size: ${fontSizes.md};
  color: ${colors.text.primary};

  input {
    margin-right: ${spacing.sm};
  }
`;

export const CloseButton = styled.button`
  display: block;
  padding: ${spacing.sm} ${spacing.md};
  font-size: ${fontSizes.md};
  background: ${colors.success};
  color: ${colors.text.inverted};
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;

  &:hover {
    background: ${colors.accent};
  }
`;

export const ToggleWrapper = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${fontSizes.md};
  color: ${colors.text.primary};
  padding: ${spacing.xs} 0;
`;

export const ToggleInput = styled.input`
  display: none;
`;

export const ToggleSlider = styled.span<{ checked: boolean }>`
  width: 40px;
  height: 20px;
  background-color: ${(props) =>
    props.checked ? colors.success : colors.neutral[300]};
  border-radius: 999px;
  position: relative;
  transition: background-color 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    height: 16px;
    width: 16px;
    left: ${(props) => (props.checked ? "20px" : "2px")};
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: left 0.2s ease;
  }
`;
export const FlagGroup = styled.div`
  background: ${colors.neutral[100]};
  border-radius: ${borderRadius.sm};
  padding: ${spacing.md};
  margin-bottom: ${spacing.md};
  box-shadow: ${shadows.sm};
`;

export const GroupTitle = styled.h3`
  margin-bottom: ${spacing.sm};
  font-size: ${fontSizes.lg};
  color: ${colors.primary};
`;

export const MoreIconButton = styled.button`
  background: transparent;
  border: none;
  font-size: ${fontSizes.lg};
  cursor: pointer;
  color: ${colors.text.primary};

  &:hover {
    color: ${colors.accent};
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${spacing.md};
`;

export const EditButton = styled.button`
  background: ${colors.primary};
  color: ${colors.text.inverted};
  border: none;
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.md};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  cursor: pointer;

  &:hover {
    background: ${colors.accent};
  }
`;

export const DeleteButton = styled.button`
  background: ${colors.error};
  color: ${colors.text.inverted};
  border: none;
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${borderRadius.sm};
  font-size: ${fontSizes.md};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid ${colors.neutral[300]};
`;

export const AdminName = styled.div`
  font-size: ${fontSizes.md};
  font-weight: 600;
  color: ${colors.text.primary};
`;

export const AdminEmail = styled.div`
  font-size: ${fontSizes.sm};
  color: ${colors.text.secondary};
`;

export const AddBtn = styled.button`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  background: linear-gradient(135deg, ${colors.primary}, ${colors.secondary});
  color: ${colors.text.inverted};
  padding: ${spacing.sm} ${spacing.md};
  border: none;
  border-radius: ${borderRadius.md};
  font-size: ${fontSizes.md};
  cursor: pointer;
  transition: all 0.2s ease;

  .button-text {
    display: inline;
  }
`;
export const EmptyState = styled.div`
  text-align: center;
  margin-top: ${spacing.xl};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmptyImage = styled.img`
  max-width: 250px;
  width: 100%;
  height: auto;
  margin-bottom: ${spacing.md};
`;

export const EmptyText = styled.p`
  font-size: ${fontSizes.md};
  color: ${colors.text.secondary};
`;
