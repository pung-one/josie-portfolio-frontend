import { styled } from "styled-components";
import Image from "next/image";

export default function TitleImage({ onShowDetails, image, slug }) {
  return (
    <TitleImageContainer key={slug}>
      <StyledImage
        alt={slug}
        src={image.url}
        width={image.width}
        height={image.height}
        onClick={() => onShowDetails(slug)}
      />
    </TitleImageContainer>
  );
}

const TitleImageContainer = styled.section`
  position: relative;
  height: 65vh;
  width: 100%;
  box-shadow: 0 0 40px grey;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
  &:hover {
    cursor: pointer;
  }
`;
