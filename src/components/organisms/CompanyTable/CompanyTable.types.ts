import { CompanyItem } from "../../../store";

export type CompanyTableProps = {
  onClick: (e: CompanyItem) => void;
  hasPagination?: boolean;
  hideHeader?: boolean;
}