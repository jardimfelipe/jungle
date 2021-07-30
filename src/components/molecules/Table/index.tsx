import React, { useState, useEffect } from 'react';

import { Field, TableProps, SortOrder } from './table.types';

import {
  StyledTable,
  StyledTableColumnHeader,
  StyledTableHeader,
  StyledTableRow,
  StyledTableColumnBody,
  StyledTableBody,
  StyledExpandableColumn,
  LoaderWrapper,
  TableContainer,
} from './table.styled';

import {
  FaAngleDown,
  FaAngleUp,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { Box, Button, Typography } from '../..';
import { Oval } from 'react-loading-icons';
import { useTheme } from 'styled-components';

const { Text } = Typography;

const Table: React.FC<TableProps> = ({
  fields,
  items,
  isLoading,
  loaderIcon,
  rowType,
  hideHeader = false,
}) => {
  const theme = useTheme();
  const [tableItems, setTableItems] = useState<any[]>([]);
  const [sortState, setSortState] = useState<SortOrder>('ascend');

  const handleExpandClick = (rowIndex: number) => {
    const x = tableItems.map((item, index) => ({
      ...item,
      ...(index === rowIndex && { isExpanded: !item.isExpanded }),
    }));
    setTableItems([...x]);
  };

  const handleSortClick = (field: Field) => {
    if (!field.sorter) return;
    const sortedItems =
      sortState === 'ascend'
        ? items.sort(field.sorter)
        : items.sort(field.sorter).reverse();
    setTableItems([...sortedItems]);
    setSortState((prevState) =>
      prevState === 'ascend' ? 'descend' : 'ascend'
    );
  };

  useEffect(() => {
    setTableItems(items.map((item) => ({ ...item, isExpanded: false })));
    // setTableItems(items)
  }, [items, setTableItems]);

  return (
    <TableContainer className="table">
      <LoaderWrapper isLoading={isLoading}>
        {loaderIcon || <Oval stroke={theme.colors.blue} height={50} />}
      </LoaderWrapper>
      <StyledTable>
        {!hideHeader && (
          <StyledTableHeader>
            <StyledTableRow>
              {fields.map((field, index) => {
                return (
                  <StyledTableColumnHeader
                    sorter={!!field.sorter}
                    onClick={() => handleSortClick(field)}
                    key={`column-header-${field.key}-${Math.random()}`}
                  >
                    {field.title}
                    {field.sorter ? (
                      sortState === 'ascend' ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )
                    ) : null}
                  </StyledTableColumnHeader>
                );
              })}
            </StyledTableRow>
          </StyledTableHeader>
        )}
        <StyledTableBody>
          {tableItems.length ? (
            tableItems.map((item, rowIndex) => {
              return (
                <React.Fragment key={`body-row-${item}-${Math.random()}`}>
                  <StyledTableRow isbody>
                    {Object.keys(item).map((props, index) => {
                      const currentItem = fields[index];
                      return (
                        currentItem && (
                          <StyledTableColumnBody
                            border={
                              'border' in item && index === 0
                                ? item['border' as keyof typeof item]
                                : null
                            }
                            key={`body-column-${item}-${Math.random()}`}
                            rowType={rowType}
                          >
                            {currentItem.render
                              ? currentItem.render(
                                  item[currentItem.key],
                                  item,
                                  rowIndex
                                )
                              : item[currentItem.key]}
                          </StyledTableColumnBody>
                        )
                      );
                    })}
                    {item.expandableContent && (
                      <StyledTableColumnBody border={null}>
                        <Button onClick={() => handleExpandClick(rowIndex)}>
                          {item.isExpanded ? (
                            <FaAngleUp color="#606060" />
                          ) : (
                            <FaAngleDown color="#606060" />
                          )}
                        </Button>
                      </StyledTableColumnBody>
                    )}
                  </StyledTableRow>
                  {item.isExpanded && (
                    <StyledTableRow>
                      <StyledExpandableColumn
                        colSpan={fields.length + 1}
                        border={
                          'border' in item && rowIndex === 0
                            ? item['border' as keyof typeof item]
                            : null
                        }
                        key={`body-column-${item}-${Math.random()}`}
                      >
                        <Box params={{ display: 'block' }}>
                          {item.expandableContent}
                        </Box>
                      </StyledExpandableColumn>
                    </StyledTableRow>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <StyledTableRow>
              <StyledTableColumnBody border={null} colSpan={fields.length + 1}>
                <Box params={{ textAlign: 'center' }}>
                  <Text disabled>Nenhuma informação encontrada</Text>
                </Box>
              </StyledTableColumnBody>
            </StyledTableRow>
          )}
        </StyledTableBody>
      </StyledTable>
    </TableContainer>
  );
};

export default Table;
