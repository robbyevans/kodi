import styled from "styled-components";
import { colors } from "../../styles/foundation";

export const SearchContainer = styled.div`
  position: relative;
  width: 300px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const SuggestionsDropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  background: #fff;
  border: 1px solid #ddd;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
`;

export const SuggestionItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  color: ${colors.text.primary};
  &:hover {
    background: #eee;
  }
`;
