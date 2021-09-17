import styled from 'styled-components';
import { StyledButton } from '../../atoms/Button/Button.styled';

export const FilterLink = styled(StyledButton)<{ isActive: boolean }>`
  position: relative;
  ${(props) =>
    props.isActive
      ? `
    &:after {
      content: '';
      height: 4px;
      width: 28px;
      position: absolute;
      bottom: 10px;
      background-color: ${props.theme.colors.blue};
    }
  `
      : `
    color: ${props.theme.colors.darkGray}
  `};
`;

export const TabNavigation = styled(FilterLink)`
  color: ${(props) => props.theme.colors.black};
  font-size: 16px;
  ${(props) => (props.isActive ? `font-weight: bold;` : 'font-weight: normal')};
`;
