import { gql } from "@apollo/client";
import client from "@/apollo-client";

export default function DetailPage({ artworkData }) {
  console.log(artworkData.attributes.Titel);
  return <h1>{artworkData.attributes.Titel}</h1>;
}

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
