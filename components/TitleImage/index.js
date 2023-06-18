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
  width: 580px;
  height: fit-content;
  /* box-shadow: 0 0 30px grey; */
  /* transition: box-shadow 0.1s; */
  transition: transform 0.3s, box-shadow 0.1s;

  ${(props) =>
    !props.$isOpen
      ? css`
          &:hover {
            cursor: pointer;
            box-shadow: 0 0 7px grey;
            transform: scale(1.009);
          }
        `
      : null}
`;
