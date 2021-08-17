export type TableMenuItem = {
  title: string;
  onClick: (index: number) => void;
  isDanger?: boolean
}

export type TableMenuProps = {
  onClose: () => void;
  isOpen: boolean;
  menuItems: TableMenuItem[]
  itemIndex: number;
};