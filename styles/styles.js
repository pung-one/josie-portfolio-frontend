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
    font-size: 18px;
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
    font-family: NewOrderLight;
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
`;
export default GlobalStyle;
