export type SlidePaginationParam = 'decrement' | 'increment';

export type PaginationProps = {
  defaultCurrent?: number;
  pageSize?: number;
  onChange: (current: number, newPage: number) => void;
} & (
  | { totalPages: number; totalItems?: never }
  | { totalItems: number; totalPages?: never }
);

export interface PaginationItemProps {
  current?: boolean;
}
