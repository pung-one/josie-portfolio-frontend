import { gql } from "@apollo/client";
import client from "@/apollo-client";
import { styled } from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ posts }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    setImages(
      posts.map(({ attributes }) => {
        return attributes.Bilder.data;
      })
    );
  }, []);
  console.log(images);
  return (
    <PageContainer>
      <h1>Josie Overton</h1>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query {
        artworks {
          data {
            attributes {
              Beschreibung
              Titel
              slug
              Jahr
              Titelbild {
                data {
                  attributes {
                    url
                  }
                }
              }
              Bilder {
                data {
                  attributes {
                    url
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
