import styled from "styled-components";
import Image from "next/image";

export default function ImageContainer({ image }) {
  return (
    <StyledImage
      alt={image.alt}
      src={image.url}
      width={image.width}
      height={image.height}
    />
  );
}

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: fit-content;
`;
