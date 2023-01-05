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

    /* width */
    ::-webkit-scrollbar {
    width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
    background: #ccc; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #888; 
    transition: .2s;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #555; 
    }
`;

export default GlobalStyle;
