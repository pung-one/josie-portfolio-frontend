import { gql } from "@apollo/client";
import client from "@/apollo-client";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import Artwork from "@/components/Artwork";
import TitleImage from "@/components/TitleImage";
import Link from "next/link";

export default function Home({ posts, deviceType }) {
  const [showDetails, setShowDetails] = useState("none");
  const [artworks, setArtworks] = useState([]);

  function handleShowDetails(slug) {
    setShowDetails(slug);
  }

  function handleCloseDetails() {
    setShowDetails("none");
  }

  useEffect(() => {
    setArtworks(
      posts.map(({ attributes }) => {
        const artwork = {
          title: attributes.Titel,
          description: attributes.Beschreibung,
          year: attributes.Jahr,
          slug: attributes.slug,
        };
        const titleImage = attributes.Titelbild.data.attributes.formats;
        const images = attributes.Bilder.data.map(
          (image) => image.attributes.formats
        );

        if (deviceType == "mobile") {
          return {
            ...artwork,
            titleImage: titleImage.small,
            images: images.map((image) => image.small),
          };
        } else if (deviceType == "tablet") {
          return {
            ...artwork,
            titleImage: titleImage.medium,
            images: images.map((image) => image.medium),
          };
        } else if (deviceType == "desktop") {
          return {
            ...artwork,
            titleImage: titleImage.large,
            images: images.map((image) => image.large),
          };
        }
      })
    );
  }, [deviceType]);

  if (!artworks[0]) return <LoadingMessage>Loading..</LoadingMessage>;

  return (
    <PageContainer>
      <h1>Josie Overton</h1>
      {artworks?.map((artwork) => {
        return (
          <ArtworkSection key={artwork.slug}>
            {deviceType === "desktop" ? (
              <Artwork
                showDetails={showDetails}
                handleShowDetails={handleShowDetails}
                handleCloseDetails={handleCloseDetails}
                artwork={artwork}
              />
            ) : (
              <Link href={`${artwork.slug}`}>
                <TitleImage
                  onShowDetails={handleShowDetails}
                  image={artwork.titleImage}
                  slug={artwork.slug}
                />
              </Link>
            )}
          </ArtworkSection>
        );
      })}
    </PageContainer>
  );
}

const LoadingMessage = styled.h1`
  width: 100%;
  text-align: center;
`;

const PageContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  max-width: 1200px;
`;

const ArtworkSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 8vh 0;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 80%;
    background-color: black;
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        artworks {
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
      posts: data.artworks.data,
    },
  };
}
