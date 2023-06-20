import { gql } from "@apollo/client";
import client from "@/apollo-client";
import styled from "styled-components";
import { useState, useEffect } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ImageContainer from "@/components/ImageContainer";
import uuid from "react-uuid";
import { TfiArrowLeft } from "react-icons/tfi";
import Link from "next/link";

export default function DetailPage({ artworkData, deviceType }) {
  const [language, setLanguage] = useState("english");
  const [imagesForMobileGallery, setImagesForMobileGallery] = useState([]);
  const [imagesForDesktop, setImagesForDesktop] = useState([]);
  console.log(language);
  const {
    Titel,
    Titelbild,
    Bilder,
    Beschreibung,
    BegleittextDeu,
    BegleittextEng,
  } = artworkData.attributes;

  function handleToggleLanguage() {
    if (language === "english") {
      setLanguage("german");
    } else if (language === "german") {
      setLanguage("english");
    }
  }

  useEffect(() => {
    const titelbildData = Titelbild.data.attributes.formats;

    const titleImgForGallery = {
      thumbnail: titelbildData.thumbnail,
      original:
        deviceType === "large" && titelbildData.large
          ? titelbildData.large.url
          : deviceType === "mobile" && titelbildData.small
          ? titelbildData.small.url
          : titelbildData.medium.url,
      originalAlt: Beschreibung,
    };

    const otherImagesForGallery = Bilder.data.map((image) => {
      if (!image) {
        return null;
      }
      const imgData = image.attributes.formats;

      return {
        thumbnail: imgData.thumbnail.url,
        original:
          deviceType === "large" && imgData.large
            ? imgData.large.url
            : deviceType === "mobile" && imgData.small
            ? imgData.small.url
            : imgData.medium.url,
        originalAlt: Beschreibung,
      };
    });

    setImagesForMobileGallery([
      { ...titleImgForGallery },
      ...otherImagesForGallery,
    ]);

    const titleImageForDesktop = {
      url:
        deviceType === "large" && titelbildData.large
          ? titelbildData.large.url
          : deviceType === "mobile" && titelbildData.small
          ? titelbildData.small.url
          : titelbildData.medium.url,
      width:
        deviceType === "large" && titelbildData.large
          ? titelbildData.large.width
          : deviceType === "mobile" && titelbildData.small
          ? titelbildData.small.width
          : titelbildData.medium.width,
      height:
        deviceType === "large" && titelbildData.large
          ? titelbildData.large.height
          : deviceType === "mobile" && titelbildData.small
          ? titelbildData.small.height
          : titelbildData.medium.height,
      alt: Beschreibung,
    };

    const otherImagesForDesktop = Bilder.data.map((image) => {
      const imgData = image.attributes.formats;
      return {
        url:
          deviceType === "large" && imgData.large
            ? imgData.large.url
            : deviceType === "mobile" && imgData.small
            ? imgData.small.url
            : imgData.medium.url,
        width:
          deviceType === "large" && imgData.large
            ? imgData.large.width
            : deviceType === "mobile" && imgData.small
            ? imgData.small.width
            : imgData.medium.width,
        height:
          deviceType === "large" && imgData.large
            ? imgData.large.height
            : deviceType === "mobile" && imgData.small
            ? imgData.small.height
            : imgData.medium.height,
        alt: Beschreibung,
      };
    });

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
                  <TfiAngleRight size={30} color="#fff" />
                </button>
              );
            }}
          />
        )}
      </GalleryContainer>
      <DetailsContainer $isOnDesktop={deviceType === "desktop"}>
        <Title>{Titel}</Title>
        <Description>
          <ReactMarkdown>{Beschreibung}</ReactMarkdown>
          <br />
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
          <ReactMarkdown>
            {language === "german" ? BegleittextDeu : BegleittextEng}
          </ReactMarkdown>
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

const Description = styled.section`
  max-width: 400px;
  margin: 0 0 0 auto;
`;

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query {
        artworks(filters: { publishedAt: { notNull: true } }) {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });
  return {
    paths: data.artworks.data.map((item) => ({
      params: { slug: item.attributes.slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const { data, error } = await client.query({
      query: gql`
      query {
        artworks (
            sort: "publishedAt:desc"
            pagination: { limit: 1 }
            filters: { slug: { eq: "${params.slug}" } }
          )  {
          data {
            attributes {
              Titel
              Titelbild {
                data {
                  attributes {
                    formats
                  }
                }
              }
              Bilder {
                data {
                  attributes {
                    formats
                  }
                }
              }
            Beschreibung
            BegleittextDeu
            BegleittextEng
            }
          }
        }
      }
    `,
    });

    if (error || !data) {
      return { notFound: true };
    }

    return {
      props: {
        artworkData: data.artworks.data[0],
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
