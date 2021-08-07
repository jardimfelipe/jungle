import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
::-webkit-scrollbar {
  width: 20px;
}

::-webkit-scrollbar-track {
  background-color: #e4e4e4;
  width: 5px;
}

::-webkit-scrollbar-thumb {
  border-radius: 100px;
  border: 6px solid transparent;
  background-clip: content-box;
  background-color: ${props => props.theme.colors.darkGray};
  max-height: 20px;
}
  html, body {
    font-family: 'Raleway', sans-serif;
    margin: 0;
    padding: 0;
    outline: none;
    position: relative;
    background-color: ${(props) => props.theme.colors.gray};
    color: ${(props) => props.theme.colors.black};
    height: 100%;
     -webkit-font-smoothing: antialiased !important;
  }

  p{
    margin: 0;
    margin-bottom: 20px;
  }

  div {
    font-weight: 500;
  }

  button{
    cursor: pointer;
    background-color: transparent;
    border-radius: 10px;
    font-weight: bold;
    font-size: 16px;
    &, input, textarea, a {
      box-shadow: none;
      border-color: transparent;
      font-family: 'Raleway', sans-serif;
    }
  }

  input, textarea, a {
    box-shadow: none;
    border-color: transparent;
    font-family: 'Raleway', sans-serif;
  }

  #app {
    height: 100%;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  *:active, :focus {

  }

  a {
    color: ${(props) => props.theme.colors.blue};
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;
  }


  ul {
    margin: 0;
    padding: 0;
    list-style-position: inside;
  }

  ::-moz-selection {
    color: white;
    background: ${(props) => props.theme.colors.blue};
  }

  ::selection {
    color: white;
    background: ${(props) => props.theme.colors.blue};
  }

  textarea:focus, input:focus{
    outline: none;
    font-family: 'Raleway', sans-serif;
}
`;

export default GlobalStyles;
