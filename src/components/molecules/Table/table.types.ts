import { ReactNode } from "react"

export type SortOrder = "ascend" | "descend" | ""

export type RowTypes = "modern" | "normal"

export type Field = {
  title: string;
  dataIndex: string;
  key: string;
  render?: (value: any, object: any, index: number) => void
  sorter?: (a: object, b: object) => any
}

export interface TableProps {
  fields: Field[]
  items: object[]
  isLoading?: boolean
  loaderIcon?: ReactNode | ImageData;
  rowType?: RowTypes
  hideHeader?: boolean
}

export interface IStyledTableRowProps {
  isbody?: boolean
}

export interface StyledTableColumnBodyProps {
  border: string | null
  rowType?: RowTypes
}

export interface StyledTableColumnHeaderProps {
  sorter: boolean
  onClick?: (field: Field) => void
}

export type StyledExpandableRowProps = {
  isexpanded: boolean
}

export type LoaderProps = {
  isLoading?: boolean;
}