import { createGlobalStyle } from "styled-components";
import { fonts } from "theme";

const GlobalStyle = createGlobalStyle`

  body {
    font-family: ${fonts.main};
    margin: 0;
    height: 100%;
    background-color: black;
    letter-spacing:1px;
  }
  .App {
    height: 100vh;
    display: flex;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  a {
      font-family: ${fonts.main};
      letter-spacing: 0.03em;
  }
  .hide{display: none;}

  .f-underline {text-decoration: underline;}
  .f-yellow{ color : var(--yellow);}
  .f-bold{ font-weight: bold; }

  .m-t-5 { margin-top: 5px; }
  .m-t-10 { margin-top: 10px; }
  .m-t-15 { margin-top: 15px; }
  .m-t-20 { margin-top: 20px; }
  .m-t-25 { margin-top: 25px; }
  .m-t-30 { margin-top: 30px; }
  .m-t-40 { margin-top: 40px; }

  .m-b-35 { margin-bottom: 35px; }
  .m-b-25 { margin-bottom: 25px; }
`;

export default GlobalStyle;
