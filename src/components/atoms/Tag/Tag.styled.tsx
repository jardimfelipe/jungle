import styled, { css } from 'styled-components';
import { TagProps } from './Tag.types';

const tagStyles = {
  regular: css`
    font-size: 10px;
    padding: 2px 5px;
  `,
  large: css`
    font-size: 12px;
    padding: 5px 7px;
  `,
};

const tagColors = {
  warning: css`
    background-color: #ffae33;
  `,
  error: css`
    background-color: #eb4447;
  `,
  success: css`
    background-color: #50daa8;
  `,
  primary: css`
    background-color: ${(props) => props.theme.colors.blue};
  `,
};

export const Tag = styled.span<TagProps>`
  font-weight: bold;
  color: #ffffff;
  border-radius: 5px;
  ${({ color = 'warning' }) => tagColors[color]};
  ${({ size = 'regular' }) => tagStyles[size]};
`;
