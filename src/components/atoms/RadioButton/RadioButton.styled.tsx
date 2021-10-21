import styled from 'styled-components';

const checkboxColor = '#3bc8e3';

export const RadioControl = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.darkGray};
  position: relative;
  flex-shrink: 0;
  svg {
    transform: scale(0);
    width: 1em;
    height: 1em;
    visibility: hidden;
    transition: 180ms transform ease-in-out;
  }
`;

export const RadioWrapper = styled.span<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.colors.gray};
  padding: 5px 20px 5px 0;
  border-radius: 50px;
  transition: 180ms background ease-in-out;
  cursor: pointer;
  span {
    margin-right: 10px;
  }
  input {
    opacity: 0;
    width: 0;
    height: 0;
    ${(props) =>
      props.checked &&
      `
          & + ${RadioControl} {
        border-color: ${checkboxColor};
        background-color: #ffffff;
        svg {
          visibility: visible;
          transform: scale(1);
        }
      }
    `};
    &:checked {
      & + ${RadioControl} {
        border-color: ${checkboxColor};
        background-color: #ffffff;
        svg {
          visibility: visible;
          transform: scale(1);
        }
      }
    }
  }
  ${(props) =>
    props.checked &&
    `
    background-color: ${checkboxColor};
    color: #ffffff;
  `};
`;

export const RadioLabel = styled.label``;
