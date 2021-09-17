import React, { useState, useEffect, useCallback } from 'react';

import { PaginationProps, SlidePaginationParam } from './Pagination.types';
import { PaginationItem, PaginationWrapper } from './Pagination.styled';
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useTheme } from 'styled-components';

const MAX_PAGES_DISPLAY = 5;

const Pagination: React.FC<PaginationProps> = ({
  defaultCurrent,
  totalPages,
  pageSize = 5,
  totalItems,
  onChange,
}) => {
  const theme = useTheme();
  const [pagesToRender, setPagesToRender] = useState(0);
  const [isSlidingPagination, setIsSlidingPagination] = useState(false);
  const [maxLastPage, setMaxLastPage] = useState(5);
  const [current, setCurrent] = useState(1);

  const calcPagesToRender = useCallback(() => {
    if (!totalItems) return;
    const quotient = Math.floor(totalItems / pageSize);
    const remainder = totalItems % pageSize;
    setPagesToRender(() => (remainder > 0 ? quotient + 1 : quotient));
  }, [pageSize, totalItems]);

  const handleChange = (current: number, newPage: number) => {
    setIsSlidingPagination(false);
    setCurrent(newPage);
    onChange(current, newPage);
  };

  const handleSlidePagination = (type: SlidePaginationParam) => {
    setIsSlidingPagination(true);
    setMaxLastPage(
      (maxLastPage) =>
        (maxLastPage =
          type === 'increment'
            ? (maxLastPage += MAX_PAGES_DISPLAY)
            : (maxLastPage -= MAX_PAGES_DISPLAY))
    );
  };

  useEffect(() => {
    totalPages ? setPagesToRender(() => totalPages) : calcPagesToRender();
    defaultCurrent && setCurrent(defaultCurrent);
  }, [totalPages, defaultCurrent, setPagesToRender, calcPagesToRender]);

  useEffect(() => {
    if (isSlidingPagination) return;
    if (current > maxLastPage)
      setMaxLastPage((maxLastPage) => (maxLastPage += MAX_PAGES_DISPLAY));
    if (current < maxLastPage - MAX_PAGES_DISPLAY)
      setMaxLastPage((maxLastPage) => (maxLastPage -= MAX_PAGES_DISPLAY));
  }, [current, maxLastPage, isSlidingPagination]);

  return (
    <PaginationWrapper>
      {/* <li>
        <PaginationItem
          data-testid="first-page"
          onClick={() => current > 1 && handleChange(current, 1)}
          disabled={current === 1}
        >
          <FaAngleDoubleLeft color={theme.colors.darkGray} />
        </PaginationItem>
      </li> */}

      {current > 1 && (
        <li>
          <PaginationItem
            onClick={() => current > 1 && handleChange(current, current - 1)}
            data-testid="previous-page"
          >
            <AiOutlineLeft color={theme.colors.darkGray} />
          </PaginationItem>
        </li>
      )}
      {pagesToRender > MAX_PAGES_DISPLAY && maxLastPage > MAX_PAGES_DISPLAY && (
        <li>
          <PaginationItem onClick={() => handleSlidePagination('decrement')}>
            ...
          </PaginationItem>
        </li>
      )}

      {[...Array(pagesToRender)].map((_, index) => {
        return index < maxLastPage &&
          index >= maxLastPage - MAX_PAGES_DISPLAY ? (
          <li key={`pagination-${index}`}>
            <PaginationItem
              onClick={() => handleChange(current, index + 1)}
              current={index + 1 === current}
              data-testid="page-button"
            >
              {index + 1}
            </PaginationItem>
          </li>
        ) : null;
      })}

      {pagesToRender > MAX_PAGES_DISPLAY && maxLastPage < pagesToRender && (
        <li>
          <PaginationItem onClick={() => handleSlidePagination('increment')}>
            ...
          </PaginationItem>
        </li>
      )}

      {current !== pagesToRender && (
        <li>
          <PaginationItem
            onClick={() =>
              current < pagesToRender && handleChange(current, current + 1)
            }
            data-testid="next-page"
          >
            <AiOutlineRight color={theme.colors.darkGray} />
          </PaginationItem>
        </li>
      )}

      {/* <li>
        <PaginationItem
          disabled={current === pagesToRender}
          data-testid="last-page"
          onClick={() =>
            current < pagesToRender && handleChange(current, pagesToRender)
          }
        >
          <FaAngleDoubleRight color={theme.colors.darkGray} />
        </PaginationItem>
      </li> */}
    </PaginationWrapper>
  );
};

export default Pagination;
