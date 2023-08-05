import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";

export default function Contact({ contactData }) {
  return (
    <ContactContainer>
      <ReactMarkdown>{contactData.contactData}</ReactMarkdown>
      <StyledLink
        href={"https://www.instagram.com/d_josieoverton/"}
        target="_blank"
      >
        Instagram
      </StyledLink>
      <WebsiteCredits>Website designed & developed by:</WebsiteCredits>
      <StyledLink href={"https://github.com/pung-one/"} target="_blank">
        https://github.com/pung-one/
      </StyledLink>
    </ContactContainer>
  );
}

const ContactContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 3vw;
`;

const StyledLink = styled(Link)`
  position: relative;
  width: fit-content;
  text-decoration: none;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    right: 0;
    background-color: black;
    transform: scaleX(1);
  }
`;

const WebsiteCredits = styled.p`
  margin-top: 10vh;
`;
