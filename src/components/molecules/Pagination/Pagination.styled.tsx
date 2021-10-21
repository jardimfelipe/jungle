import styled from 'styled-components';
import { PaginationItemProps } from './Pagination.types';

export const PaginationWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;
  list-style-type: none;
`;

export const PaginationItem = styled.a<PaginationItemProps>`
  color: ${(props) =>
    props.current ? props.theme.colors.blue : props.theme.colors.black};
  padding: 10px;
  border-radius: 8px;
  line-height: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  ${(props) =>
    props.current &&
    `background-color: rgba(0, 98, 255, 0.2); font-weight: bold;`};
`;
