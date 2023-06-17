import { styled } from "styled-components";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <Header>
        <Link href={"/"} passHref legacyBehavior>
          <StyledLink>Josie Overton</StyledLink>
        </Link>
        <Link href={"/"} passHref legacyBehavior>
          <StyledLink>Info</StyledLink>
        </Link>
      </Header>
      {children}
    </>
  );
}

const Header = styled.header`
  z-index: 2;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  width: 100%;
  border-bottom: 1px solid black;
`;

const StyledLink = styled.a`
  text-decoration: none;
  margin: 0 20px;
`;
