import { styled } from "styled-components";

export default function CloseDetailsButton({ showDetails, onCloseDetails }) {
  return <CloseButton onClick={() => onCloseDetails()}>X</CloseButton>;
}

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background-color: white;
  border: none;
  font-size: 3vh;
  &:hover {
    cursor: pointer;
  }
`;
