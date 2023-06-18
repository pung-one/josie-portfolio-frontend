import { gql } from "@apollo/client";
import client from "@/apollo-client";
import { styled } from "styled-components";
import { useState, useEffect } from "react";

export default function InfoPage({ aboutData, deviceType }) {
  const [aboutMe, setAboutMe] = useState({});
  const [contactData, setContactData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [workData, setWorkData] = useState({});

  const [showInfo, setShowInfo] = useState("about-me");

  useEffect(() => {
    setAboutMe({ ...aboutData.aboutMe.data.attributes });
    setContactData({ ...aboutData.contact.data.attributes });
    setEducationData([...aboutData.ausbildungs.data]);
    setWorkData({
      exhibitions: [...aboutData.exhibitions.data],
      upcomingExhibitions: [...aboutData.kommendeAusstellungens.data],
      soundDesigns: [...aboutData.sounddesigns.data],
    });
  }, [aboutData]);

  console.log(aboutMe);
  console.log(workData);
  console.log(contactData);
  console.log(educationData);

  return (
    <PageContainer>
      <NavContainer>
        <NavList>
          <NavItem
            $isActive={showInfo === "about-me"}
            onClick={() => setShowInfo("about-me")}
          >
            About Me
          </NavItem>
          <NavItem
            $isActive={showInfo === "exhibitions"}
            onClick={() => setShowInfo("exhibitions")}
          >
            Exhibitions
          </NavItem>
          <NavItem
            $isActive={showInfo === "contact"}
            onClick={() => setShowInfo("contact")}
          >
            Contact
          </NavItem>
        </NavList>
      </NavContainer>
      <InfoContainer>
        {showInfo === "about-me" ? (
          <AboutMe>
            <PersonalData>
              {aboutMe.Name}, {aboutMe.Geburtsdatum}
              <br />
              Geboren in {aboutMe.Geburtsort}
              <br />
              Aufgewachsen in {aboutMe.aufgewachsen}
            </PersonalData>
            <Description>{aboutMe.Selbstbeschreibung}</Description>
            <Education>
              {educationData.map((edu) => (
                <EduSection>
                  <EduTime>
                    <p>{edu.attributes.von}</p> — <p>{edu.attributes.bis}</p>
                  </EduTime>
                  <EduPlace>{edu.attributes.Ausbildung}</EduPlace>
                </EduSection>
              ))}
            </Education>
          </AboutMe>
        ) : showInfo === "exhibitions" ? (
          <Exhibitions>
            {workData.upcomingExhibitions[0] && (
              <ExhiContainer>
                <ExhiHeadline>kommende Ausstellungen</ExhiHeadline>
                {workData.upcomingExhibitions.map((exhi) => {
                  console.log(exhi);
                  return (
                    <ExhiSection>
                      <ExhiYear>{exhi.attributes.Jahr}</ExhiYear>
                      <ExhiPlace>{exhi.attributes.Ausstellung}</ExhiPlace>
                    </ExhiSection>
                  );
                })}
              </ExhiContainer>
            )}
            <ExhiContainer>
              <ExhiHeadline>Ausstellungen</ExhiHeadline>
              {workData.exhibitions.map((exhi) => {
                return (
                  <ExhiSection>
                    <ExhiYear>{exhi.attributes.Jahr}</ExhiYear>
                    <ExhiPlace>{exhi.attributes.Ausstellung}</ExhiPlace>
                  </ExhiSection>
                );
              })}
            </ExhiContainer>
          </Exhibitions>
        ) : (
          ""
        )}
      </InfoContainer>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
  display: flex;
  padding: 16vh 0 10vh;
  margin-left: 10vw;
  max-width: 1200px;
`;

const NavContainer = styled.nav`
  width: 38%;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const NavItem = styled.li`
  position: relative;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
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

const InfoContainer = styled.section`
  width: 62%;
  padding: 0 10px;
`;

const AboutMe = styled.article`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const PersonalData = styled.p``;

const Description = styled.p``;

const Education = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const EduSection = styled.div`
  display: flex;
`;

const EduTime = styled.p`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 30%;
`;

const EduPlace = styled.p`
  padding: 0 20px;
  width: 70%;
`;

const Exhibitions = styled.article`
  display: flex;
  flex-direction: column;
  gap: 100px;
`;

const ExhiContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ExhiHeadline = styled.h2`
  margin-bottom: 50px;
`;

const ExhiSection = styled.div`
  display: flex;
`;

const ExhiYear = styled.p`
  display: flex;
  width: 30%;
`;

const ExhiPlace = styled.p`
  padding: 0 20px;
  width: 70%;
`;

export async function getStaticProps() {
  const { data, error } = await client.query({
    query: gql`
      query {
        aboutMe {
          data {
            attributes {
              Name
              Geburtsdatum
              Geburtsort
              aufgewachsen
              Selbstbeschreibung
            }
          }
        }
        contact {
          data {
            attributes {
              Name
              Strasse
              plzUndOrt
              email
              telefon
            }
          }
        }
        ausbildungs {
          data {
            attributes {
              von
              bis
              Ausbildung
            }
          }
        }
        exhibitions {
          data {
            attributes {
              Jahr
              Ausstellung
            }
          }
        }
        kommendeAusstellungens {
          data {
            attributes {
              Jahr
              Ausstellung
            }
          }
        }
        sounddesigns {
          data {
            attributes {
              Jahr
              Location
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      aboutData: data,
    },
  };
}
