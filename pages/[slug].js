import { gql } from "@apollo/client";
import client from "@/apollo-client";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

export default function DetailPage({ artworkData, deviceType }) {
  const [images, setImages] = useState([]);
  const { Titel, Jahr, Titelbild, Bilder, Beschreibung } =
    artworkData.attributes;
  useEffect(() => {
    setImages(
      Bilder.data.map((image) => {
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
        };
      })
    );
  }, [deviceType]);

  if (!images[0]) return <h1>Loading..</h1>;

  return (
    <PageContainer>
      <GalleryContainer>
        <ReactImageGallery
          items={images}
          showNav={true}
          showThumbnails={false}
          showFullscreenButton={true}
          showPlayButton={false}
          showBullets={true}
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
      </GalleryContainer>
      <DetailsContainer>
        <Title>
          {Titel} - {Jahr}
        </Title>
        <Description>{Beschreibung}</Description>
      </DetailsContainer>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
  padding-top: 8vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const GalleryContainer = styled.aside`
  position: relative;
  width: 50%;
  min-width: fit-content;
`;

const DetailsContainer = styled.aside`
  position: relative;
  width: 100%;
  max-width: 540px;
  padding: 50px 20px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 0 0 5vh;
`;

const Description = styled.p`
  max-width: 400px;
  margin: 0 auto;
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
  const { data } = await client.query({
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
              Beschreibung
              Jahr
              slug
              Bilder {
                data {
                  attributes {
                    formats
                  }
                }
              }
              Titelbild {
                data {
                  attributes {
                    formats
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      artworkData: data.artworks.data[0],
    },
  };
}
