import styled, { css } from 'styled-components';
import { ButtonProps } from './Button.type';
import { darken, lighten } from 'polished';

const ButtonVariants = {
  primary: css`
    background-color: ${(props) => props.theme.colors.blue};
    border: 1px solid ${(props) => props.theme.colors.blue};
    color: #ffffff;
    box-shadow: 0px 5px 35px rgba(0, 98, 255, 0.25);
    &:hover {
      background-color: ${(props) => darken(0.05, props.theme.colors.blue)};
    }
    &:active {
      background-color: ${(props) => lighten(0.05, props.theme.colors.blue)};
    }
    &[disabled] {
      background-color: ${(props) => props.theme.colors.darkGray};
      border: 1px solid ${(props) => props.theme.colors.darkGray};
      box-shadow: none;
      cursor: default;
    }
  `,
  secondary: css`
    border: 1px solid ${(props) => props.theme.colors.blue};
    color: ${(props) => props.theme.colors.blue};
    &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
    &[disabled] {
      border-color: ${(props) => props.theme.colors.darkGray};
      color: ${(props) => props.theme.colors.darkGray};
      cursor: default;
    }
  `,
  link: css`
    color: ${(props) => props.theme.colors.blue};
    &:active {
      ${(props) => lighten(0.05, props.theme.colors.black)};
    }
    &[disabled] {
      color: ${(props) => props.theme.colors.darkGray};
      cursor: default;
    }
  `,
  cancel: css`
    border: 1px solid ${(props) => props.theme.colors.p1};
    color: ${(props) => props.theme.colors.p1};
  `,
};

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  transition: 0.3s;
  ${({ variant = 'link' }) => ButtonVariants[variant]};
  padding: ${({ size = 'regular' }) =>
    size === 'regular' ? '15px 5px' : '10px'};
  ${(props) => props.block && 'display: block; width: 100%;'};
`;
