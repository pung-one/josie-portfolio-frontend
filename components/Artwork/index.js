import { styled } from "styled-components";
import TitleImage from "../TitleImage";
import ImageContainer from "../ImageContainer";
import CloseDetailsButton from "@/components/CloseDetailsButton";
import uuid from "react-uuid";
import Link from "next/link";

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
          <Description>{description}</Description>
          <br />
          <br />
          <Link href={`/${slug}`}>Read more</Link>
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
  position: relative;
  width: 50%;
  max-width: ${({ $show }) => ($show ? "2000px" : "0")};
  max-height: ${({ $show }) => ($show ? "4000px" : "0")};
  overflow: hidden;
  transition: max-width 0.8s ease-in, max-height 0.4s ease-out;
`;

const Details = styled.article`
  max-width: 400px;
  margin: 0 0 0 auto;
`;

const Description = styled.p`
  margin-top: 5vh;
`;
