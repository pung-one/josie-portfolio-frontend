import { styled } from "styled-components";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <>
      <Header>
        <StyledLink href={"/"}>
          <Headline>Josie Overton</Headline>
        </StyledLink>
        <StyledLink href={"/info"}>Info</StyledLink>
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

const Headline = styled.h1``;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0 20px;
`;
