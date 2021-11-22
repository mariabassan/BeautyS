import { createGlobalStyle } from 'styled-components';
import "@fontsource/hanuman";

export const colors = {
  mediumblue: '#77BCD4',
  skyblue: '#B0D5EC',
  lightblue: '#93CEF0',
  crystal: '#B7D9EE',
  peach: '#FFC9B2',
  lightgreen: '',
  mediumgreen: '#B4DC94',
  teal: '#81CDB9',
  lightteal: '#93D2D6',
  paleyellow: '#FFEDD3',
  lightyellow: '#FFDB99',
  mediumyellow: '#FFD08B',
  yellowmellow: '#FBE69B',
  mintgreen: '#C7F0CE',
  seagreen: '#AFDDCB',
  hotpink: '#F98080',
  lightpink: '#FFB9B0',
  babypink: '#FDCCCC',
  lightbrown: '#BE8B7B',
  purple: '#C0BADE',
  pearl: '#fdf2e9',
};

export const fonts = {
  annie: "'Annie Use Your Telescope', cursive",
  roboto: "'Roboto Slab', serif;",
  hanuman: "Hanuman"
};

export const calculateResponsiveSize = (min: number, max: number) =>
  `calc(${min}px + (${max} - ${min}) * ((100vw - 300px) / (1600 - 300)))`;

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #ffffff;
    color: #636363;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }

  /* input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active  {
    box-shadow: 0 0 0px 1000px #232129 inset;
    transition: "color 9999s ease-out, background-color 9999s ease-out";
    transition-delay: 9999s;
  } */
`;
