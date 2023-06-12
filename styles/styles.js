import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  
  :root{
    --primary-background: #b6bfc1;
    --primary-accent: #929a9c;
    --accent: #f15a30;
    --secondary: white;
    --headline-font: Oxygen;
    --content-font: NotoSerif;
    
    font-size: 18px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
    margin: 0;
    font-family: var(--content-font);
    padding: 0;
    background-color: var(--primary-background);
    color: black;
  }
  h1 {
    font-family: var(--headline-font);
    color: var(--primary-accent);
  }
  h2 {
    font-family: var(--headline-font);
  }
  p {
    line-height: 1.8;
  }
`;
