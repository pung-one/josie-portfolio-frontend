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
        <Link href={`/${slug}`} style={{ display: "inline-block" }}>
          <Title>
            {title}
            {" - "}
            {year}
          </Title>
        </Link>
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
  max-width: 50%;
  gap: 50px;
  margin: 0 auto;
  position: relative;
`;

const DetailsContainer = styled.section`
  position: relative;
  width: 100%;
  max-width: ${({ $show }) => ($show ? "2000px" : "0")};
  max-height: ${({ $show }) => ($show ? "4000px" : "0")};
  overflow: hidden;
  transition: max-width 0.8s ease, max-height 0.4s ease;
`;

const Title = styled.h2`
  margin: 0 0 5vh 10vw;
`;

const Description = styled.p`
  max-width: 400px;
  margin: 0 0 0 auto;
`;
