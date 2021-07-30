export type TableMenuItem = {
  title: string;
  onClick: () => void;
  isDanger?: boolean
}

export type TableMenuProps = {
  onClose: () => void;
  isOpen: boolean;
  menuItems: TableMenuItem[]
};