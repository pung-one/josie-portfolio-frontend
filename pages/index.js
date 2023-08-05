import { gql } from "@apollo/client";
import client from "@/apollo-client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SortContent from "@/utils/SortContent";
import React from "react";
import { TfiAngleDown } from "react-icons/tfi";

export default function Home({ posts, deviceType }) {
  const [artworks, setArtworks] = useState([]);
  const [showArrow, setShowArrow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  function handleScroll() {
    if (typeof window !== "undefined") {
      if (window.scrollY > 100) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
      setLastScrollY(window.scrollY);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined" && deviceType !== "mobile") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY]);

  useEffect(() => {
    setArtworks(
      posts.sort(SortContent).map(({ attributes }) => {
        return {
          slug: attributes.slug,
          titleImage: attributes.Titelbild.data.attributes,
        };
      })
    );
  }, [deviceType]);

  if (!artworks.length === 0) return <LoadingMessage>Loading..</LoadingMessage>;

  return (
    <PageContainer>
      {artworks?.map((artwork) => {
        const { url, width, height } = artwork.titleImage;
        return (
          <React.Fragment key={artwork.titleImage.hash}>
            <ArtworkSection>
              <Link href={`${artwork.slug}`}>
                <StyledImage
                  alt={artwork.slug}
                  src={url}
                  width={width}
                  height={height}
                  $isOnPortraitViewport={
                    deviceType === "mobile" || deviceType === "tablet"
                  }
                />
              </Link>
            </ArtworkSection>
            <Seperator />
          </React.Fragment>
        );
      })}
      {deviceType !== "mobile" && (
        <ArrowDown $showArrow={showArrow}>
          <Arrow />
        </ArrowDown>
      )}
    </PageContainer>
  );
}

const LoadingMessage = styled.h1`
  width: 100%;
  text-align: center;
  padding-top: 8vh;
`;

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 6vh;
  margin: auto;
`;

const ArrowDown = styled.div`
  z-index: 0;
  position: sticky;
  bottom: 0;
  width: 100vw;
  font-size: 1.5rem;
  transition: all 0.3s;
  opacity: ${({ $showArrow }) => ($showArrow ? "1" : "0")};
  max-height: ${({ $showArrow }) => ($showArrow ? "100vh" : "0")};
`;

const Arrow = styled(TfiAngleDown)`
  margin-left: 5vw;
  margin-bottom: 20px;
`;

const ArtworkSection = styled.section`
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 1200px;
  padding: 10vh 4vw;
`;

const Seperator = styled.div`
  height: 1px;
  width: 100vw;
  background-color: black;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  height: ${({ $isOnPortraitViewport }) =>
    $isOnPortraitViewport ? "fit-content" : "74vh"};
  width: ${({ $isOnPortraitViewport }) =>
    $isOnPortraitViewport ? "92vw" : "fit-content"};
  max-width: 94vw;
  transition: transform 0.1s;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
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
                slug
                reihenfolge
                Titelbild {
                  data {
                    attributes {
                      url
                      width
                      height
                      hash
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
      console.log(error);
      return { notFound: true };
    }
    return {
      props: {
        posts: data.artworks.data,
      },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
}
