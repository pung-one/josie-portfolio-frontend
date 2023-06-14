import { styled } from "styled-components";
import Image from "next/image";

export default function ImageContainer({ image, slug }) {
  console.log(image);
  return (
    <Container slug={slug} key={slug}>
      <StyledImage
        alt={slug}
        src={image.url}
        width={image.width}
        height={image.height}
      />
    </Container>
  );
}

const Container = styled.section`
  height: 80vh;
  width: fit-content;
  box-shadow: 0 0 40px grey;
`;

const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: 100%;
`;
