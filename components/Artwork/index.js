import { styled } from "styled-components";
import TitleImage from "../TitleImage";
import ImageContainer from "../ImageContainer";
import CloseDetailsButton from "@/components/CloseDetailsButton";

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
        />
        {showDetails === slug
          ? images.map((image) => {
              return <ImageContainer image={image} slug={slug} />;
            })
          : ""}
      </ImagesContainer>
      <DetailsContainer show={showDetails} slug={slug}>
        <CloseDetailsButton
          showDetails={showDetails}
          onCloseDetails={handleCloseDetails}
        />
        <Title>
          {title}
          {" - "}
          {year}
        </Title>
        <Description>{description}</Description>
      </DetailsContainer>
    </>
  );
}

const ImagesContainer = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin: 0 auto;
  position: relative;
`;

const DetailsContainer = styled.aside`
  position: relative;
  width: 35%;
  max-width: ${({ show, slug }) => (show === slug ? "100vw" : "0")};
  max-height: ${({ show, slug }) => (show === slug ? "100vh" : "0")};
  overflow: hidden;
  transition: max-width 0.6s ease-in-out, max-height 0.6s ease-in-out;
`;

const Title = styled.h2`
  margin-bottom: 50px;
`;

const Description = styled.p``;
