import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';

import {
  Box,
  Button,
  ColumnButton,
  IconButton,
  // Pagination,
  PromotionalCard,
  Select,
  Table,
  Typography,
} from '../..';
import { BiSearch, BiDotsVertical } from 'react-icons/bi';
import { useTheme } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getDimensionsRequest } from '../../../store/modules/dimensions/actions';
import DimensionForm from './Modals/Dimension.form';

const { Title, Text } = Typography;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Dimensions: React.FC = () => {
  const dispatch = useDispatch();
  const { dimensions, isLoading } = useSelector(
    ({ dimensions }: RootState) => dimensions
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateDimension = () => {
    setIsModalOpen(true);
  };

  // const [pageNumber, setPageNumber] = useState(1);

  // const handlePagination = (_: number, newPage: number) => {
  //   setPageNumber(newPage);
  // };
  const theme = useTheme();

  useEffect(() => {
    dispatch(getDimensionsRequest());
  }, [dispatch]);

  const tableFields = [
    {
      title: 'Dimensão',
      dataIndex: 'name',
      key: 'name',
      render: (value: string) => (
        <Text variant="primary" textDecoration="strong">
          {value}
        </Text>
      ),
    },

    {
      title: 'Questões (min)',
      dataIndex: 'qt_minimum',
      key: 'qt_minimum',
      render: (value: string) => <Text textDecoration="strong">{value}</Text>,
    },
    {
      title: 'Obrigatórias (P1)',
      dataIndex: 'mandatory',
      key: 'mandatory',
      render: (value: string) => (
        <Text style={{ color: theme.colors.p1 }} textDecoration="strong">
          {value}
        </Text>
      ),
    },
    {
      title: 'Complementares (P2)',
      dataIndex: 'complementary',
      key: 'complementary',
      render: (value: string) => (
        <Text style={{ color: theme.colors.p2 }} textDecoration="strong">
          {value}
        </Text>
      ),
    },
    {
      title: 'Opcionais (P3)',
      dataIndex: 'optional',
      key: 'optional',
      render: (value: string) => (
        <Text style={{ color: theme.colors.p3 }} textDecoration="strong">
          {value}
        </Text>
      ),
    },
    {
      title: 'Questões (Max)',
      dataIndex: 'qt_maximum',
      key: 'qt_maximum',
      render: (value: string) => <Text textDecoration="strong">{value}</Text>,
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (value: string) => (
        <ColumnButton onClick={() => console.log(value)}>
          <BiDotsVertical size="24" />
        </ColumnButton>
      ),
    },
  ];
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
        <Title level={3}>Dimensões</Title>
        <Box
          params={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            flex: '0 0 30%',
          }}
        >
          <IconButton icon={<BiSearch />} />
          <Button
            block
            size="small"
            onClick={handleCreateDimension}
            variant="primary"
          >
            Cadastrar Dimensões
          </Button>
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
          <Table
            items={dimensions}
            isLoading={isLoading}
            fields={tableFields}
          />
        </Col>
      </Row>

      <DimensionForm isModalOpen={isModalOpen} onClose={handleModalClose} />

      {/* <Row end="xs">
        <Pagination onChange={handlePagination} totalItems={30} pageSize={5} />
      </Row> */}
    </Box>
  );
};

export default Dimensions;
