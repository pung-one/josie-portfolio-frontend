import styled from "styled-components";
import { useState, useEffect } from "react";
import AboutMe from "@/components/AboutMe";
import Exhibitions from "@/components/Exhibitions";
import Contact from "@/components/Contact";
import InfoNavDesktop from "@/components/InfoNavDesktop";
import InfoNavMobile from "@/components/InfoNavMobile";

export default function InfoPage({ aboutData, deviceType }) {
  const [aboutMeData, setAboutMeData] = useState({});
  const [contactData, setContactData] = useState({});
  const [workData, setWorkData] = useState({});
  const [showInfo, setShowInfo] = useState("about-me");

  function handleShowInfo(info) {
    setShowInfo(info);
  }

  useEffect(() => {
    setAboutMeData({ ...aboutData.aboutMeData });
    setContactData({ ...aboutData.contactData });
    setWorkData({ ...aboutData.exhibitionData });
  }, [aboutData]);

  if (!aboutMeData || !contactData || !workData) return <h1>Loading..</h1>;

  return (
    <PageContainer $isOnDesktop={deviceType === "desktop"}>
      {deviceType === "desktop" ? (
        <InfoNavDesktop
          onShowInfo={handleShowInfo}
          showInfo={showInfo}
          upcomingExists={workData?.upcomingExhi !== undefined}
        />
      ) : (
        <InfoNavMobile onShowInfo={handleShowInfo} showInfo={showInfo} />
      )}
      <InfoContainer $isOnDesktop={deviceType === "desktop"}>
        {showInfo === "about-me" ? (
          <AboutMe aboutMe={aboutMeData} />
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
  const contentful = require("contentful");

  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const aboutMeEntries = await client
    .getEntries({
      content_type: "aboutMe",
    })
    .catch((e) => {
      console.log(e);
    });

  const exhibitionEntries = await client
    .getEntries({
      content_type: "allExhibitions",
    })
    .catch((e) => {
      console.log(e);
    });

  const contactEntries = await client
    .getEntries({
      content_type: "contact",
    })
    .catch((e) => {
      console.log(e);
    });

  const data = {
    aboutMeData: { ...aboutMeEntries.items[0].fields },
    exhibitionData: { ...exhibitionEntries.items[0].fields },
    contactData: { ...contactEntries.items[0].fields },
  };

  return {
    props: {
      aboutData: data,
    },
  };
}
