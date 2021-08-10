import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import {
  Box,
  Button,
  IconButton,
  Table,
  Typography,
  Avatar,
  Tag,
  ColumnButton,
} from '../..';
import { BiSearch } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PromotionalCard from '../../molecules/PromotionalCard/PromotionalCard';
import Profile from '../../../assets/profile.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  getGestoresRequest,
  resetUsersErrors,
} from '../../../store/modules/users/actions';
import { Field } from '../../molecules/Table/table.types';
import { useTheme } from 'styled-components';
import TableMenu from './TableMenu';
import CreateUser from './Modals/CreateUser';

const { Title } = Typography;

const Companies: React.FC = () => {
  const tableFields: Field[] = [
    {
      title: 'Colaborador',
      dataIndex: 'name',
      key: 'name',
      render: (value) => (
        <Box params={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Avatar image={Profile} />
          {value}
        </Box>
      ),
    },
    {
      title: 'Setor',
      dataIndex: 'sector',
      key: 'sector',
      render: (value) => value || 'Financeiro',
    },
    {
      title: 'Função',
      dataIndex: 'function',
      key: 'function',
      render: (value) => value || 'Contador',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'id',
      key: 'id',
      render: (value) => (
        <Tag size="large" color="success">
          {value ? 'ativo' : 'inativo'}
        </Tag>
      ),
    },
    {
      title: '',
      dataIndex: '_id',
      key: '_id',
      render: (value, item, index) => (
        <>
          <TableMenu
            onClose={() => handleCloseButton()}
            isOpen={currentOpenMenu === index}
          />
          <ColumnButton onClick={() => handleTableButtonClick(index)}>
            <BsThreeDotsVertical color={theme.colors.black} size="24" />
          </ColumnButton>
        </>
      ),
    },
  ];
  const theme = useTheme();
  const [currentOpenMenu, setCurrentOpenMenu] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { gestores, isLoading } = useSelector(
    (state: RootState) => state.users
  );

  const handleTableButtonClick = (index: number) => {
    setCurrentOpenMenu(index);
  };

  const handleModalButton = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    dispatch(resetUsersErrors());
    setIsModalOpen(false);
  };

  const handleCloseButton = () => {
    setCurrentOpenMenu(-1);
  };

  useEffect(() => {
    dispatch(getGestoresRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title="Colaboradores da sua equipe"
        text="Olá! Aqui você encontra a relação de colaboradores de sua equipe que foram cadastrados na jornada Jungle. Caso haja modificação no staff, podemos incluir ou retirar pessoas de nossa análise sigilosa ok?"
      />

      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3}>Empresas</Title>
        <Box
          params={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}
        >
          <IconButton icon={<BiSearch />} />
          <Box
            params={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 60%',
            }}
          >
            <Button block size="small" variant="secondary">
              Baixar Planilhas
            </Button>
          </Box>
          <Box
            params={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 60%',
            }}
          >
            <Button
              onClick={handleModalButton}
              block
              size="small"
              variant="primary"
            >
              Cadastrar Usuários
            </Button>
          </Box>
        </Box>
      </Box>

      <Row>
        <Col xs>
          <Table items={gestores} fields={tableFields} isLoading={isLoading} />
        </Col>
      </Row>

      <CreateUser onClose={handleModalClose} isModalOpen={isModalOpen} />
    </Box>
  );
};

export default Companies;
