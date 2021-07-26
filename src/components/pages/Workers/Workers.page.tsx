import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import {
  Box,
  Button,
  IconButton,
  Select,
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
import { getGestoresRequest } from '../../../store/modules/users/actions';
import { Field } from '../../molecules/Table/table.types';
import { useTheme } from 'styled-components';
import TableMenu from './TableMenu';

const { Title } = Typography;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Companies: React.FC = () => {
  const theme = useTheme();
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
  const [currentOpenMenu, setCurrentOpenMenu] = useState(-1);
  const dispatch = useDispatch();
  const { gestores, isLoading } = useSelector(
    (state: RootState) => state.users
  );

  const handleTableButtonClick = (index: number) => {
    setCurrentOpenMenu(index);
  };

  const handleCloseButton = () => {
    setCurrentOpenMenu(-1);
  };
  useEffect(() => {
    dispatch(getGestoresRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />

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
            <Button block size="small" variant="primary">
              Cadastrar Usuários
            </Button>
          </Box>
        </Box>
      </Box>

      <Row>
        <Col xs={12} md={6} lg={4}>
          <Select placeholder="Selecione o filtro" options={options} />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Select placeholder="Selecione o filtro" options={options} />
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Select placeholder="Selecione o filtro" options={options} />
        </Col>
      </Row>

      <Row>
        <Col xs>
          <Table items={gestores} fields={tableFields} isLoading={isLoading} />
        </Col>
      </Row>
    </Box>
  );
};

export default Companies;
