import styled, { css } from 'styled-components';
import { TypographyTypes } from './typography.types';

const textDecorations = {
  underline: css`
    text-decoration: underline;
  `,
  strong: css`
    font-weight: bold;
  `,
  delete: css`
    text-decoration: line-through;
  `,
};

const textDisabled = css`
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
  user-select: none;
`;

export const Typography = styled.div<TypographyTypes>`
  ${({ textDecoration }) => {
    const idx = textDecoration as keyof typeof textDecorations;
    return textDecoration && textDecorations[idx];
  }};
  ${({ disabled }) => disabled && textDisabled};

  ${({ onClick }) => onClick && 'cursor:pointer'};

  ${(props) =>
    props.variant === 'primary' && `color: ${props.theme.colors.blue}`};

  ${({ size }) => size && `font-size: ${size}px`};

  ${({ color }) => color && `color: ${color}`};
`;
