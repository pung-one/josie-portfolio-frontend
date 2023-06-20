import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SortContent from "@/utils/SortContent";
import Link from "next/link";

export default function AboutMe({ aboutMe, educationData }) {
  if (!aboutMe.portfolioPDF?.data.attributes.url) return <h1>Loading..</h1>;

  return (
    <AboutMeContainer>
      <StyledLink href={aboutMe.portfolioPDF?.data.attributes.url}>
        Download Portfolio
      </StyledLink>
      <section>
        <ReactMarkdown>{aboutMe.personalData}</ReactMarkdown>
      </section>
      <section>
        <ReactMarkdown>{aboutMe.Selbstbeschreibung}</ReactMarkdown>
      </section>
      <h2>Ausbildung</h2>
      <Education>
        {educationData.sort(SortContent).map((edu) => (
          <EduSection key={edu.attributes.Ausbildung}>
            <EduTime>
              {edu.attributes.von ? (
                <>
                  <p>{edu.attributes.von}</p>
                  <p>-</p>
                </>
              ) : (
                ""
              )}
              <p>{edu.attributes.bis}</p>
            </EduTime>
            <EduPlace>{edu.attributes.Ausbildung}</EduPlace>
          </EduSection>
        ))}
      </Education>
    </AboutMeContainer>
  );
}

const AboutMeContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 7vh;
`;

const StyledLink = styled(Link)``;

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
