import { gql } from "@apollo/client";
import client from "@/apollo-client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Artwork from "@/components/Artwork";
import Image from "next/image";
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
          text: attributes.Begleittext,
          year: attributes.Jahr,
          slug: attributes.slug,
        };
        const titleImage = attributes.Titelbild.data.attributes.formats;
        const images = attributes.Bilder.data.map(
          (image) => image.attributes.formats
        );

        return {
          ...artwork,
          titleImage:
            deviceType === "desktop" && titleImage.large
              ? titleImage.large
              : deviceType === "mobile" && titleImage.small
              ? titleImage.small
              : titleImage.medium,
          images: images.map((image) =>
            deviceType === "desktop" && image.large
              ? { ...image.large }
              : deviceType === "mobile" && image.small
              ? { ...image.small }
              : { ...image.medium }
          ),
        };
      })
    );
  }, [deviceType]);

  return (
    <PageContainer>
      {artworks?.map((artwork) => {
        if (!artwork) {
          return null;
        }
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
                <StyledImage
                  alt={artwork.slug}
                  src={artwork.titleImage.url}
                  width={artwork.titleImage.width}
                  height={artwork.titleImage.height}
                />
              </Link>
            )}
          </ArtworkSection>
        );
      })}
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  padding-top: 6vh;
  margin: auto;
`;

const ArtworkSection = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10vh 20px;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 1px;
    width: 80%;
    background-color: black;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  height: fit-content;
  width: 90vw;
  box-shadow: 0 0 40px grey;
  &:hover {
    cursor: pointer;
  }
`;

export async function getStaticProps() {
  try {
    const { data, error } = await client.query({
      query: gql`
        query {
          artworks {
            data {
              attributes {
                Titel
                Beschreibung
                Begleittext
                Jahr
                slug
                reihenfolge
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
    if (error || !data) {
      return { notFound: true };
    }
    return {
      props: {
        posts: data.artworks.data,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
