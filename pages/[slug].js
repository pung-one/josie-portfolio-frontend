import { gql } from "@apollo/client";
import client from "@/apollo-client";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Image from "next/image";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function DetailPage({ artworkData, deviceType }) {
  const [images, setImages] = useState([]);
  const { Titel, Jahr, Titelbild, Bilder, Beschreibung } =
    artworkData.attributes;
  useEffect(() => {
    setImages(
      Bilder.data.map((image) => {
        console.log(image);
        const imgData = { thumbnail: image.attributes.formats.thumbnail.url };
        if (deviceType == "mobile") {
          return {
            ...imgData,
            original: image.attributes.formats.small.url,
          };
        } else if (deviceType == "tablet") {
          return {
            ...imgData,
            original: image.attributes.formats.medium.url,
          };
        } else if (deviceType == "desktop") {
          return {
            ...imgData,
            original: image.attributes.formats.large.url,
          };
        }
      })
    );
  }, [deviceType]);
  console.log(images);

  if (!images[0]) return <h1>Loading..</h1>;

  return (
    <PageContainer>
      <ReactImageGallery
        items={images}
        showNav={true}
        showThumbnails={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={true}
      />
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
`;

const ImageSlide = styled.section`
  position: relative;
  max-width: 100vw;
  overflow-x: scroll;
`;

const StyledImage = styled(Image)`
  position: relative;
  object-fit: contain;
  width: 100%;
  height: 100%;
  display: inline;
`;

const DetailsContainer = styled.aside`
  position: relative;
  max-width: 600px;
  padding: 15vh 20px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 30px;
`;

const Description = styled.p`
  padding: 0 4vw;
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
