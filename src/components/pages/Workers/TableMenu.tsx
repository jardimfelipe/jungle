import React from 'react';
import { GrClose } from 'react-icons/gr';
import { useTheme } from 'styled-components';
import { Box } from '../..';
import { ColumnButton } from '../../atoms/ColumnButton/ColumnButton.styled';
import { MenuCard, MenuButton } from './Workers.styled';
import { Transition } from 'react-transition-group';
import { TableMenuProps } from './Workers.type';

const menuStyle = {
  transition: `200ms ease-in-out`,
  height: 0,
  width: 0,
};

const menuTransition = {
  entering: { width: 0, height: 0 },
  entered: { width: '150px', height: 'auto' },
  exiting: { width: 0, height: 0 },
  exited: { width: 0, height: 0 },
};

const TableMenu: React.FC<TableMenuProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  return (
    <Transition in={isOpen} timeout={200} unmountOnExit>
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
            <li role="menuitem">
              <MenuButton>Visualizar</MenuButton>
            </li>
            <li role="menuitem">
              <MenuButton>Editar</MenuButton>
            </li>
            <li role="menuitem">
              <MenuButton>Ativar/inativar</MenuButton>
            </li>
            <li role="menuitem">
              <MenuButton danger>Excluir</MenuButton>
            </li>
          </ul>


        </MenuCard>
      )}
    </Transition>
  );
};

export default TableMenu;
