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
  object-fit: cover;
  width: 100%;
  max-width: 450px;
  height: fit-content;
  transition: max-width 0.4s, transform 0.2s, box-shadow 0.1s;

  ${(props) =>
    !props.$isOpen
      ? css`
          &:hover {
            cursor: pointer;
            box-shadow: 0 0 7px grey;
            transform: scale(1.009);
          }
        `
      : props.$isOpen
      ? css`
          max-width: 580px;
        `
      : ""}
`;
