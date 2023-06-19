import styled from "styled-components";

export default function InfoNavDesktop({ onShowInfo, showInfo }) {
  return (
    <NavContainer>
      <NavList>
        <NavItem
          $isActive={showInfo === "about-me"}
          onClick={() => onShowInfo("about-me")}
        >
          About Me
        </NavItem>
        <NavItem
          $isActive={showInfo === "exhibitions"}
          onClick={() => onShowInfo("exhibitions")}
        >
          Exhibitions
        </NavItem>
        <NavItem
          $isActive={showInfo === "contact"}
          onClick={() => onShowInfo("contact")}
        >
          Contact
        </NavItem>
      </NavList>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  width: 38%;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const NavItem = styled.li`
  position: relative;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    right: 0;
    background-color: black;
    transform: ${({ $isActive }) => ($isActive ? "scaleX(1)" : "scaleX(0)")};
    transform-origin: bottom right;
    transition: transform 0.2s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom right;
  }
`;
