import { createGlobalStyle } from "styled-components";

import "./Fonts.css";
// import "./Icon.css";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-weight: 500;
        font-style: normal;
        font-family: 'Poppins', sans-serif;
    }

    .container {
        max-width: 1110px;
        padding: 0 16px;
        margin: 0 auto;
    }
`;

export default GlobalStyle;
