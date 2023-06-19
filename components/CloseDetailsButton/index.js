import styled from "styled-components";

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
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    transform-origin: bottom right;
    bottom: 0;
    right: 0;
    background-color: black;
    transition: transform 0.2s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom right;
  }
`;
