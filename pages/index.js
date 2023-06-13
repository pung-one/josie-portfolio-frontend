import { gql } from "@apollo/client";
import client from "@/apollo-client";
import { styled } from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home({ posts, deviceType }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(
      posts.map(({ attributes }) => {
        const imageSrc = attributes.Titelbild.data.attributes.formats;
        const slug = attributes.slug;
        if (deviceType == "mobile") {
          return { imageSrc: imageSrc.small, slug: slug };
        } else if (deviceType == "tablet") {
          return { imageSrc: imageSrc.medium, slug: slug };
        } else if (deviceType == "desktop") {
          return { imageSrc: imageSrc.large, slug: slug };
        }
      })
    );
  }, [deviceType]);

  if (!images[0]) return <LoadingMessage>Loading..</LoadingMessage>;

  console.log(images);

  return (
    <PageContainer>
      <h1>Josie Overton</h1>
      {images?.map(({ imageSrc, slug }) => {
        console.log(imageSrc);
        return (
          <ImageContainer key={slug}>
            <Link href={`/${slug}`}>
              <StyledImage
                alt={slug}
                src={imageSrc.url}
                width={imageSrc.width}
                height={imageSrc.height}
              />
            </Link>
          </ImageContainer>
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
  gap: 20vh;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 70vh;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        artworks {
          data {
            attributes {
              slug
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
