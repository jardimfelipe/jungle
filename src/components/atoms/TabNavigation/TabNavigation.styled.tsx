import styled from 'styled-components';
import { FilterLink } from '../../pages/Companies/Companies.styled';

export const TabNavigation = styled(FilterLink)`
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 16px;
  ${(props) => props.isActive && `color: ${props.theme.colors.black}`};
`;
