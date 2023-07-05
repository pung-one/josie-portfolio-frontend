import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  @font-face {
  font-family: "NewOrderLight";
  src: local("NewOrderLight"), url("./fonts/New-Order-Light.otf");
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
    font-weight: lighter;
    font-family: NewOrderLight, Helvetica, sans-serif;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
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

  .image-gallery-icon {
    filter:drop-shadow(0 1px 0px black);
    &:hover{
      color: white;
    }
  }

`;
export default GlobalStyle;
