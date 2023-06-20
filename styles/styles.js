import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  @font-face {
  font-family: "NewOrderNormal";
  src: url("./fonts/New-Order-Regular.otf");
  }

  @font-face {
  font-family: "NewOrderBold";
  src: url("./fonts/New-Order-Bold.otf");
  }

  @font-face {
  font-family: "NewOrderLight";
  src: url("./fonts/New-Order-Light.otf");
  }

  
  :root{
    font-size: 20px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
    margin: 0;
    padding: 0;
    font-family: NewOrderLight;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-family: var(--headline-font);
  }
  p {
    line-height: 1.8;
  }
  a {
    text-decoration: underline;
    color: black;
  }

  .image-gallery{
    position: relative;
    max-width: 800px;
    margin: 8vh auto 0;
    
  }
  .image-gallery img{
    margin: auto;
    width: fit-content;
    height: 60vh;
  }

`;
export default GlobalStyle;
