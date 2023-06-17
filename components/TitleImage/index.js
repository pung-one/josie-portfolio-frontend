import { styled } from "styled-components";
import Image from "next/image";

export default function TitleImage({ onShowDetails, image, slug }) {
  return (
    <StyledImage
      alt={slug}
      src={image.url}
      width={image.width}
      height={image.height}
      onClick={() => onShowDetails(slug)}
    />
  );
}

const StyledImage = styled(Image)`
  object-fit: contain;
  width: fit-content;
  height: fit-content;
  max-height: 70vh;
  box-shadow: 0 0 40px grey;
  &:hover {
    cursor: pointer;
  }
`;
