import React from 'react';
import { GrClose } from 'react-icons/gr';
import { useTheme } from 'styled-components';
import { Box } from '../..';
import { ColumnButton } from '../../atoms/ColumnButton/ColumnButton.styled';
import { Transition } from 'react-transition-group';
import { TableMenuProps } from './TableMenu.types';
import { MenuButton, MenuCard } from './TableMenu.styled';

const menuStyle = {
  transition: `50ms ease-in-out`,
  height: 0,
  width: 0,
};

const menuTransition = {
  entering: { width: 0, height: 0 },
  entered: { width: '150px', height: 'auto' },
  exiting: { width: 0, height: 0 },
  exited: { width: 0, height: 0 },
};

const TableMenu: React.FC<TableMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
  itemIndex,
}) => {
  const theme = useTheme();
  return (
    <Transition in={isOpen} timeout={10} unmountOnExit>
      {(state) => (
        <MenuCard
          style={{
            ...menuStyle,
            ...menuTransition[state as keyof typeof menuTransition],
          }}
        >
          <ul role="menu">
            <li role="menuitem">
              <Box
                params={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '0 10px',
                }}
              >
                <ColumnButton onClick={onClose}>
                  <GrClose size="18" color={theme.colors.darkGray} />
                </ColumnButton>
              </Box>
            </li>
            {menuItems.map((menuItem) => (
              <li role="menuitem">
                <MenuButton
                  danger={menuItem.isDanger}
                  onClick={() => menuItem.onClick(itemIndex)}
                >
                  {menuItem.title}
                </MenuButton>
              </li>
            ))}
          </ul>
        </MenuCard>
      )}
    </Transition>
  );
};

export default TableMenu;
