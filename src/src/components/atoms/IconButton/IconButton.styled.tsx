import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';

export const StyledIconButton = styled(StyledButton)`
  transition: 0.7s;
  svg {
    color: ${(props) => props.theme.colors.darkGray};
    width: 32px;
    height: 32px;
  }
  &:hover,
  &:active {
    svg {
      color: ${(props) => props.theme.colors.black};
    }
  }
  border-radius: 50px;
`;
