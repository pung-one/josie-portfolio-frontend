import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Link from "next/link";

export default function Contact({ contactData }) {
  return (
    <ContactContainer>
      <ReactMarkdown>{contactData.contactData}</ReactMarkdown>
      <Link href={"https://www.instagram.com/d_josieoverton/"} target="_blank">
        Instagram
      </Link>
    </ContactContainer>
  );
}

const ContactContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 3vw;
`;
