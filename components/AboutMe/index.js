import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function AboutMe({ aboutMe, educationData }) {
  return (
    <AboutMeContainer>
      <PersonalData>
        <ReactMarkdown children={aboutMe.personalData} />
      </PersonalData>
      <Description>
        <ReactMarkdown children={aboutMe.Selbstbeschreibung} />
      </Description>
      <h2>Ausbildung</h2>
      <Education>
        {educationData.map((edu) => (
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
  gap: 80px;
  padding-right: 20px;
`;

const PersonalData = styled.section``;

const Description = styled.section``;

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
