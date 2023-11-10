import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SortContent from "@/utils/SortContent";
import Link from "next/link";

export default function AboutMe({ aboutMe }) {
  if (!aboutMe.portfolioPDF?.fields.file.url) return <h1>Loading..</h1>;

  console.log(aboutMe);

  return (
    <AboutMeContainer>
      <StyledLink
        href={`https:${aboutMe.portfolioPDF?.fields.file.url}`}
        target="_blank"
      >
        Download Portfolio
      </StyledLink>
      <section>
        <ReactMarkdown>{aboutMe.personalData}</ReactMarkdown>
      </section>
      <section>
        <ReactMarkdown>{aboutMe.selfDescription}</ReactMarkdown>
      </section>
      <h2>Ausbildung</h2>
      <Education>
        {aboutMe.ausbildungs.map((edu) => (
          <EduSection key={edu}>{edu}</EduSection>
        ))}
      </Education>
    </AboutMeContainer>
  );
}

const AboutMeContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 5vh;
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

const Education = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const EduSection = styled.div`
  display: flex;
`;

const EduTime = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 0 3vw 0 0;
  width: 30%;
`;

const EduPlace = styled.p`
  padding: 0 20px;
  width: 70%;
`;
