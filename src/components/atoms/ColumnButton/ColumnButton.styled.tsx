import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';

export const ColumnButton = styled(StyledButton)`
  background-color: ${(props) => props.theme.colors.gray};
  color: ${(props) => props.theme.colors.darkGray};
  border-radius: 5px;
  padding: 0;
`;
