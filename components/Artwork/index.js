import styled from "styled-components";
import TitleImage from "../TitleImage";
import ImageContainer from "../ImageContainer";
import CloseDetailsButton from "@/components/CloseDetailsButton";
import uuid from "react-uuid";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Artwork({
  artwork,
  showDetails,
  handleShowDetails,
  handleCloseDetails,
}) {
  const { titleImage, images, title, year, description, slug } = artwork;

  return (
    <>
      <ImagesContainer>
        <TitleImage
          onShowDetails={handleShowDetails}
          image={titleImage}
          slug={slug}
          isOpen={showDetails === slug}
        />
        {showDetails === slug
          ? images.map((image) => {
              return <ImageContainer key={uuid()} image={image} slug={slug} />;
            })
          : ""}
      </ImagesContainer>
      <DetailsContainer $show={showDetails === slug}>
        <CloseDetailsButton
          showDetails={showDetails}
          onCloseDetails={handleCloseDetails}
        />
        <Details>
          <Link href={`/${slug}`} style={{ display: "inline-block" }}>
            <h2>
              {title}
              {" - "}
              {year}
            </h2>
          </Link>
          <Description>
            <ReactMarkdown children={description} />
          </Description>
          <br />
          <br />
          <StyledLink href={`/${slug}`}>Read more</StyledLink>
        </Details>
      </DetailsContainer>
    </>
  );
}

const ImagesContainer = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  gap: 100px;
  margin: 0 auto;
  position: relative;
`;

const DetailsContainer = styled.section`
  position: sticky;
  top: 8vh;
  width: 50%;
  height: 100%;
  max-width: ${({ $show }) => ($show ? "3000px" : "0")};
  max-height: ${({ $show }) => ($show ? "6000px" : "0")};
  overflow: hidden;
  transition: max-width 0.6s ease-in-out, max-height 0.4s ease-out;
`;

const Details = styled.article`
  max-width: 400px;
  margin: 0 0 0 auto;
`;

const Description = styled.aside`
  margin-top: 5vh;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    right: 0;
    background-color: black;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.2s ease-out;
  }
  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom right;
  }
`;
