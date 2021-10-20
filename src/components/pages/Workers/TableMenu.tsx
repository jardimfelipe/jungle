import React from 'react';
import { GrClose } from 'react-icons/gr';
import { useTheme } from 'styled-components';
import { Box } from '../..';
import { ColumnButton } from '../../atoms/ColumnButton/ColumnButton.styled';
import { MenuCard, MenuButton } from './Workers.styled';
import { Transition } from 'react-transition-group';
import { TableMenuProps } from './Workers.type';

<<<<<<< Updated upstream
=======
import { useFormik } from 'formik'

import schema from './schema'
import { useDispatch } from 'react-redux'

import { GridBtnLeft, GridBtnRight, ModalButton, ModalGrid } from '../Dashboard/Dashboard.styled';

import ModalSuccess from '../../../assets/ModalSuccess.svg';


const {Title, Text} = Typography;

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
  const dispatch = useDispatch();
  const [isModalOpen1, setModalOpen1 ] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);
  const onClose1 = () => setModalOpen1(!isModalOpen1);
  const onClose2 = ()=> setModalOpen2(!isModalOpen2);

  const listaTipoCargo = [
    {label: 'Selecione', value: ''},
    {label: 'Gestor-supervisão ou gerência operacional', value: 'Gestor-supervisão ou gerência operacional'},
    {label: 'Gestor-média gerência', value: 'Gestor-média gerência'},
    {label: 'Gestor-Presidência/Diretoria', value: 'Gestor-Presidência/Diretoria'},
    {label: 'Colaborador', value: 'Colaborador'},
    {label: 'Terceirizado/Outsourcing', value: 'Terceirizado/Outsourcing'}
  ]
  const listaCargo = [
    {label: 'Selecione', value: ''},
    {label: 'Executivo e gestor sênior', value: 'Executivo e gestor sênior'},
    {label: 'Gerente e supervisor', value: 'Gerente e supervisor'},
    {label: 'Coordenador', value: 'Coordenador'},
    {label: 'Especialista', value: 'Especialista'},
    {label: 'Técnico', value: 'Técnico'},
    {label: 'Analista', value: 'Analista'},
    {label: 'Administrativo', value: 'Administrativo'},
    {label: 'Operacional', value: 'Operacional'},
    {label: 'Estagiário', value: 'Estagiário'},
    {label: 'Médico', value: 'Médico'},
    {label: 'Enfermeiro', value: 'Enfermeiro'}
  ]
  const listaArea = [
    {label: 'Selecione', value: ''},
    {label: 'Administrativo/Financeiro', value: 'Administrativo/Financeiro'},
    {label: 'Jurídico/Auditoria/Compliance', value: 'Jurídico/Auditoria/Compliance'},
    {label: 'Logística/Supply Chain', value: 'Logística/Supply Chain'},
    {label: 'Manutenção', value: 'Manutenção'},
    {label: 'Marketing/Sucesso do Cliente', value: 'Marketing/Sucesso do Cliente'},
    {label: 'Produção/Operação', value: 'Produção/Operação'},
    {label: 'Qualidade/Processos', value: 'Qualidade/Processos'},
    {label: 'Recursos Humanos/Medicina do Trabalho', value: 'Recursos Humanos/Medicina do Trabalho'},
    {label: 'Regionais/Agências/Representantes', value: 'Regionais/Agências/Representantes'},
    {label: 'Tecnologia da Informação', value: 'Tecnologia da Informação'},
    {label: 'Vendas/Comercial', value: 'Vendas/Comercial'}
  ]
  const listaLider = [
    {label: 'Selecione', value: ''},
    {label: 'Não', value: 'Não'},
    {label: 'Sim', value: 'Sim'}
  ]

  

>>>>>>> Stashed changes
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
