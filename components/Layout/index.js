import { styled } from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  const route = router.route;

  return (
    <>
      <Header>
        <Link href={"/"} passHref legacyBehavior>
          <StyledHomeLink>Josie Overton</StyledHomeLink>
        </Link>
        <Nav>
          <Link href={"/"} passHref legacyBehavior>
            <StyledLink $isActive={route === "/"}>Art</StyledLink>
          </Link>
          <Link href={"/info"} passHref legacyBehavior>
            <StyledLink $isActive={route === "/info"}>Info</StyledLink>
          </Link>
        </Nav>
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
  height: 6vh;
  width: 100%;
  border-bottom: 1px solid black;
`;

const Nav = styled.nav`
  display: flex;
`;

const StyledHomeLink = styled.a`
  text-decoration: none;
  margin: 0 20px;
`;

const StyledLink = styled.a`
  position: relative;
  text-decoration: none;
  margin: 0 20px;
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
