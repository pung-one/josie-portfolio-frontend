import styled from "styled-components";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SortContent from "@/utils/SortContent";
import React from "react";
import { TfiAngleDown } from "react-icons/tfi";

export default function Home({ data, deviceType }) {
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
    setArtworks(data.sort(SortContent));
  }, [deviceType]);

  if (!artworks.length === 0) return <LoadingMessage>Loading..</LoadingMessage>;

  return (
    <PageContainer>
      {artworks?.map((artwork) => {
        const { url, details } = artwork.titleImage.fields.file;
        return (
          <React.Fragment key={artwork.slug}>
            <ArtworkSection>
              <Link href={`${artwork.slug}`}>
                <StyledImage
                  alt={artwork.slug}
                  src={`https:${url}`}
                  width={details.image.width}
                  height={details.image.height}
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
      return { notFound: true };
    });

  const artworks = entries.items.map((entry) => {
    return {
      titleImage: entry.fields.titleImage,
      slug: entry.fields.slug,
      reihenfolge: entry.fields.reihenfolge,
    };
  });

  return {
    props: {
      data: artworks,
    },
  };
}
