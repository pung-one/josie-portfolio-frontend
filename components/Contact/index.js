import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Contact({ contactData }) {
  return (
    <ContactContainer>
      <ReactMarkdown>{contactData.contactData}</ReactMarkdown>
    </ContactContainer>
  );
}

const ContactContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
