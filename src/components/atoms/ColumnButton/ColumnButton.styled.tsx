import { darken } from 'polished';
import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';

export const ColumnButton = styled(StyledButton)`
  background-color: ${(props) => props.theme.colors.gray};
  color: ${(props) => props.theme.colors.darkGray};
  border-radius: 5px;
  padding: 0;
  &:active {
    background-color: ${(props) => darken(0.05, props.theme.colors.gray)};
  }
  &:hover {
    background-color: ${(props) => darken(0.02, props.theme.colors.gray)};
  }
`;
