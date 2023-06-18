import { gql } from "@apollo/client";
import client from "@/apollo-client";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import AboutMe from "@/components/AboutMe";
import Exhibitions from "@/components/Exhibitions";
import Contact from "@/components/Contact";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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

  if (!aboutMe || !contactData || !educationData || !workData)
    return <h1>Loading..</h1>;

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
          <AboutMe aboutMe={aboutMe} educationData={educationData} />
        ) : showInfo === "exhibitions" ? (
          <Exhibitions workData={workData} />
        ) : showInfo === "contact" ? (
          <Contact contactData={contactData} />
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

export async function getStaticProps() {
  const { data, error } = await client.query({
    query: gql`
      query {
        aboutMe {
          data {
            attributes {
              personalData
              Selbstbeschreibung
            }
          }
        }
        contact {
          data {
            attributes {
              contactData
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
              reihenfolge
            }
          }
        }
        kommendeAusstellungens {
          data {
            attributes {
              Jahr
              Ausstellung
              reihenfolge
            }
          }
        }
        sounddesigns {
          data {
            attributes {
              Jahr
              Location
              reihenfolge
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
