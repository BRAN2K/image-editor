'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

	html.modal-open {
		overflow: hidden;
	}

  body {
    color: #FFFFFF;
    background: #FFFFFF;
    font-family: Helvetica, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0px;
  }

  ul,
  li {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }

img {
  height: auto;
  display: block;
  max-width: 100%;
}

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #EBEBEB;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #FFFFFF;
  }
`;

export default GlobalStyle;
