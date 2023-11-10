import styled from "styled-components";
import { useState, useEffect } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import ImageContainer from "@/components/ImageContainer";
import uuid from "react-uuid";
import { TfiArrowLeft } from "react-icons/tfi";
import Link from "next/link";

export default function DetailPage({ artworkData, deviceType }) {
  const [language, setLanguage] = useState("english");
  const [imagesForMobileGallery, setImagesForMobileGallery] = useState([]);
  const [imagesForDesktop, setImagesForDesktop] = useState([]);

  const { title, titleImage, images, beschreibung, textGer, textEng } =
    artworkData;

  function handleToggleLanguage() {
    if (language === "english") {
      setLanguage("german");
    } else if (language === "german") {
      setLanguage("english");
    }
  }

  useEffect(() => {
    const titelbildData = titleImage.fields.file;

    const titleImgForGallery = {
      thumbnail: titelbildData.url,
      original: titelbildData.url,
      originalAlt: beschreibung,
    };

    const titleImageForDesktop = {
      url: titelbildData.url,
      width: titelbildData.details.image.width,
      height: titelbildData.details.image.height,
      alt: beschreibung,
    };

    let otherImagesForGallery = [];
    let otherImagesForDesktop = [];

    if (images) {
      otherImagesForGallery = images.map((image) => {
        if (!image) {
          return null;
        }

        return {
          thumbnail: image.fields.file.url,
          original: image.fields.file.url,
          originalAlt: beschreibung,
        };
      });

      otherImagesForDesktop = images.map((image) => {
        const imgData = image.fields.file;
        return {
          url: imgData.url,
          width: imgData.details.image.width,
          height: imgData.details.image.height,
          alt: beschreibung,
        };
      });
    }

    setImagesForMobileGallery([
      { ...titleImgForGallery },
      ...otherImagesForGallery,
    ]);

    setImagesForDesktop([
      { ...titleImageForDesktop },
      ...otherImagesForDesktop,
    ]);
  }, [deviceType]);

  if (!imagesForMobileGallery || !imagesForDesktop)
    return <LoadingMessage>Loading..</LoadingMessage>;

  return (
    <PageContainer $isOnDesktop={deviceType === "desktop"}>
      <BackButton href={"/"}>
        <TfiArrowLeft />
      </BackButton>
      <GalleryContainer>
        {deviceType === "desktop" ? (
          <DesktopGallery>
            {imagesForDesktop.map((image) => {
              return <ImageContainer key={uuid()} image={image} />;
            })}
          </DesktopGallery>
        ) : (
          <ReactImageGallery
            items={imagesForMobileGallery}
            showNav={true}
            showThumbnails={false}
            showFullscreenButton={true}
            showPlayButton={false}
            slideDuration={300}
            flickThreshold={0.6}
            swipeThreshold={40}
            renderLeftNav={(onClick, disabled) => {
              return (
                <button
                  type="button"
                  className="image-gallery-icon image-gallery-left-nav"
                  aria-label="Previous Slide"
                  disabled={disabled}
                  onClick={onClick}
                >
                  <TfiAngleLeft size={30} color="#fff" />
                </button>
              );
            }}
            renderRightNav={(onClick, disabled) => {
              return (
                <button
                  type="button"
                  className="image-gallery-icon image-gallery-right-nav"
                  aria-label="Next Slide"
                  disabled={disabled}
                  onClick={onClick}
                >
                  <TfiAngleRight
                    size={30}
                    color="#fff"
                    style={{ boxShadow: "none" }}
                  />
                </button>
              );
            }}
          />
        )}
      </GalleryContainer>
      <DetailsContainer $isOnDesktop={deviceType === "desktop"}>
        <Title>{title}</Title>
        <Description>
          <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
            {beschreibung}
          </ReactMarkdown>
          <br />
          {textGer && (
            <Text>
              <ButtonContainer>
                <LanguageButton
                  aria-label="switch between english and german language"
                  onClick={() => handleToggleLanguage()}
                >
                  <LangSign $isActive={language === "english"}>ENG</LangSign>
                  <span>/</span>
                  <LangSign $isActive={language === "german"}>DEU</LangSign>
                </LanguageButton>
              </ButtonContainer>
              <br />
              <ReactMarkdown remarkPlugins={[remarkBreaks, remarkGfm]}>
                {language === "german" ? textGer : textEng}
              </ReactMarkdown>
            </Text>
          )}
        </Description>
      </DetailsContainer>
    </PageContainer>
  );
}

const LoadingMessage = styled.h1`
  width: 100%;
  text-align: center;
  padding-top: 10vh;
`;

const PageContainer = styled.main`
  display: flex;
  flex-direction: ${({ $isOnDesktop }) => ($isOnDesktop ? "row" : "column")};
  justify-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6vh 20px 10vh;
`;

const BackButton = styled(Link)`
  position: absolute;
  z-index: 1;
  top: 6vh;
  left: 0;
  margin: 3vh;
  font-size: 3.5vh;
  &:hover {
    transform: scale(1.09);
  }
`;

const GalleryContainer = styled.aside`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

const DesktopGallery = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  gap: 12vh;
  margin: 10vh 0;
`;

const DetailsContainer = styled.aside`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin-top: ${({ $isOnDesktop }) => ($isOnDesktop ? "10vh" : "6vh")};
`;

const Description = styled.section`
  max-width: 400px;
  margin: 0 0 0 auto;
`;

const Text = styled.section``;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const LanguageButton = styled.button`
  border: none;
  background: none;
  font-size: 1rem;
  color: black;
  * {
    color: black;
  }
  &:hover {
    cursor: pointer;
  }
`;

const LangSign = styled.span`
  display: inline-block;
  text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};
`;

const Title = styled.h1`
  margin: 0 0 5vh auto;
  max-width: 400px;
`;

const fetchForEntries = async () => {
  const contentful = require("contentful");

  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const entries = await client
    .getEntries({
      content_type: "artwork",
    })
    .catch((e) => {
      console.log(e);
    });

  return entries;
};

export async function getStaticPaths() {
  const entries = await fetchForEntries();

  return {
    paths: entries.items.map((entry) => ({
      params: { slug: entry.fields.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const entries = await fetchForEntries();

  const artwork = entries.items.find(
    (entry) => entry.fields.slug === params.slug
  );

  return {
    props: {
      artworkData: artwork.fields,
    },
  };
}
