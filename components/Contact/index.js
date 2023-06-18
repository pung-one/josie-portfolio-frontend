import { styled } from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Contact({ contactData }) {
  return (
    <ContactContainer>
      <ReactMarkdown children={contactData.contactData} />
    </ContactContainer>
  );
}

const ContactContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 10px;
`;
