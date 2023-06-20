import styled from "styled-components";

export default function InfoNavDesktop({ onShowInfo, showInfo }) {
  return (
    <NavContainer>
      <NavList>
        <ItemContainer>
          <NavItem
            $isActive={showInfo === "about-me"}
            onClick={() => onShowInfo("about-me")}
          >
            About Me
          </NavItem>
        </ItemContainer>
        <ItemContainer>
          <NavItem
            $isActive={showInfo === "exhibitions"}
            onClick={() => onShowInfo("exhibitions")}
          >
            Exhibitions
          </NavItem>
          <ExhiList $show={showInfo === "exhibitions"}>
            <ExhiLink href="#upcoming">Upcoming Exhibitions</ExhiLink>
            <ExhiLink href="#exhibitions">Exhibitions</ExhiLink>
            <ExhiLink href="#sound">Sound Design</ExhiLink>
          </ExhiList>
        </ItemContainer>
        <ItemContainer>
          <NavItem
            $isActive={showInfo === "contact"}
            onClick={() => onShowInfo("contact")}
          >
            Contact
          </NavItem>
        </ItemContainer>
      </NavList>
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  width: 38%;
`;

const NavList = styled.ul`
  position: relative;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 5vh;
`;

const ItemContainer = styled.li``;

const NavItem = styled.span`
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

const ExhiList = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1vh;
  padding-left: 20px;
  padding-top: ${({ $show }) => ($show ? "2vh" : "0")};
  max-height: ${({ $show }) => ($show ? "50vh" : "0")};
  overflow: hidden;
  transition: max-height 0.2s ease-in-out, padding-top 0.2s ease-in-out;
  * {
    text-decoration: none;
    font-size: 0.9rem;
  }
`;

const ExhiLink = styled.a`
  position: relative;
  width: fit-content;
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
