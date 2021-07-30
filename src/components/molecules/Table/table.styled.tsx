import { rgba } from 'polished';
import styled from 'styled-components';

import {
  IStyledTableRowProps,
  LoaderProps,
  StyledTableColumnBodyProps,
  StyledTableColumnHeaderProps,
} from './table.types';

export const StyledTable = styled.table`
  width: 100%;
  max-width: 100%;
  border-collapse: separate;
  border-spacing: 0 3px;
`;

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const StyledTableHeader = styled.thead`
  background-color: ${(props) => rgba(props.theme.colors.darkGray, 0.1)};
  height: 50px;
  vertical-align: center;
`;

export const StyledTableColumnHeader = styled.th<StyledTableColumnHeaderProps>`
  border: none;
  text-align: start;
  &:first-child {
    padding-left: 16px;
  }
  svg {
    width: 10px;
    height: 10px;
    margin-left: 15px;
  }
  ${(props) =>
    props.sorter &&
    `
    cursor: pointer;
    e:hover {
      color: #000000;
    }
  `};
`;

export const StyledTableRow = styled.tr<IStyledTableRowProps>`
  border: none;
  font-weight: 700;
  font-size: 90%;
`;

export const StyledTableBody = styled.tbody``;

export const StyledTableColumnBody = styled.td<StyledTableColumnBodyProps>`
  padding: 16px 7px;
  border: none;
  background-color: #fff;
  border-top: 0;
  font-size: 14px;
  font-weight: normal;
  position: relative;
  &:first-child {
    ${(props) => !props.border && `padding-left: 16px`};
  }
  ${(props) =>
    props.border &&
    `
    border-left: 8px solid ${props.border}
  `};
  ${({ rowType }) =>
    rowType === 'modern' &&
    `
    padding: 15px 0;
    &:first-child {
      border-radius: 20px 0 0 20px;
    }
    &:last-child {
      border-radius: 0 20px 20px 0;
    }
  `};
`;
export const StyledExpandableColumn = styled(StyledTableColumnBody)`
  padding: 7px 0;
  div {
    margin-left: -16px;
    margin-top: -20px;
    background: #ffffff;
    padding: 16px 15px 0 15px;
    border-top: 1px solid #d6d6d6;
  }
`;

export const LoaderWrapper = styled.div<LoaderProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  z-index: ${({ isLoading }) => (isLoading ? 100 : -1)};
  visibility: ${({ isLoading }) => (isLoading ? 'visible' : 'hidden')};
`;
