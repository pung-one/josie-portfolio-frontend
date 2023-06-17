import { styled, css } from "styled-components";
import Image from "next/image";

export default function TitleImage({ onShowDetails, image, slug, isOpen }) {
  return (
    <StyledImage
      alt={slug}
      src={image.url}
      width={image.width}
      height={image.height}
      onClick={() => onShowDetails(slug)}
      $isOpen={isOpen}
    />
  );
}

const StyledImage = styled(Image)`
  object-fit: contain;
  width: fit-content;
  height: fit-content;
  max-height: 70vh;
  box-shadow: 0 0 20px grey;
  transition: box-shadow 0.2s;
  ${(props) =>
    !props.$isOpen
      ? css`
          &:hover {
            cursor: pointer;
            box-shadow: 0 0 40px grey;
          }
        `
      : null}
`;
