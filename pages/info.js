import { gql } from "@apollo/client";
import client from "@/apollo-client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import AboutMe from "@/components/AboutMe";
import Exhibitions from "@/components/Exhibitions";
import Contact from "@/components/Contact";
import InfoNavDesktop from "@/components/InfoNavDesktop";
import InfoNavMobile from "@/components/InfoNavMobile";

export default function InfoPage({ aboutData, deviceType }) {
  const [aboutMe, setAboutMe] = useState({});
  const [contactData, setContactData] = useState({});
  const [educationData, setEducationData] = useState([]);
  const [workData, setWorkData] = useState({});

  const [showInfo, setShowInfo] = useState("about-me");
  function handleShowInfo(info) {
    setShowInfo(info);
  }

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

  if (
    !aboutMe ||
    !contactData ||
    !educationData ||
    !workData ||
    !workData.upcomingExhibitions
  )
    return <h1>Loading..</h1>;

  return (
    <PageContainer $isOnDesktop={deviceType === "desktop"}>
      {deviceType === "desktop" ? (
        <InfoNavDesktop
          onShowInfo={handleShowInfo}
          showInfo={showInfo}
          upcomingExists={workData?.upcomingExhibitions[0] !== undefined}
        />
      ) : (
        <InfoNavMobile onShowInfo={handleShowInfo} showInfo={showInfo} />
      )}
      <InfoContainer $isOnDesktop={deviceType === "desktop"}>
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
  flex-direction: ${({ $isOnDesktop }) => ($isOnDesktop ? "row" : "column")};
  padding: ${({ $isOnDesktop }) =>
    $isOnDesktop ? "16vh 0 10vh" : "6vh 0 10vh"};
  margin: ${({ $isOnDesktop }) => ($isOnDesktop ? "0 0 0 10vw" : "")};
  max-width: 1200px;
`;

const InfoContainer = styled.section`
  width: ${({ $isOnDesktop }) => ($isOnDesktop ? "62%" : "100%")};
  padding: ${({ $isOnDesktop }) => ($isOnDesktop ? "0 20px" : "0 5vw")};
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
              portfolioPDF {
                data {
                  attributes {
                    url
                  }
                }
              }
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
        ausbildungs(pagination: { limit: 9999 }) {
          data {
            attributes {
              von
              bis
              Ausbildung
              reihenfolge
            }
          }
        }
        exhibitions(pagination: { limit: 9999 }) {
          data {
            attributes {
              Jahr
              Ausstellung
              reihenfolge
            }
          }
        }
        kommendeAusstellungens(pagination: { limit: 9999 }) {
          data {
            attributes {
              Jahr
              Ausstellung
              reihenfolge
            }
          }
        }
        sounddesigns(pagination: { limit: 9999 }) {
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
