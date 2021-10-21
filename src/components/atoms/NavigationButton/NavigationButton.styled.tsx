import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';

export const NavigationButton = styled(StyledButton)<{
  textColor?: 'normal' | 'primary';
}>`
  font-weight: 400;
  color: ${({ textColor = 'normal', ...rest }) =>
    textColor === 'normal' ? rest.theme.colors.black : rest.theme.colors.blue};
`;
