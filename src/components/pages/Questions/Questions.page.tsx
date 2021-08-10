import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';

import {
  Box,
  Button,
  ColumnButton,
  IconButton,
  // Pagination,
  PromotionalCard,
  Table,
  Typography,
} from '../..';
import { BiSearch, BiMessageSquareDetail } from 'react-icons/bi';
import { AiOutlineRight } from 'react-icons/ai';
import { useTheme } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getDimensionsRequest } from '../../../store/modules/dimensions/actions';
import CreateQuestion from './Modals/CreateQuestion.page';

const { Title, Text } = Typography;

const Questions: React.FC = () => {
  const dispatch = useDispatch();
  const { dimensions, isLoading } = useSelector(
    ({ dimensions }: RootState) => dimensions
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [pageNumber, setPageNumber] = useState(1);

  // const handlePagination = (_: number, newPage: number) => {
  //   setPageNumber(newPage);
  // };
  const theme = useTheme();

  const handleCreateQuestion = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      title: 'Total de perguntas',
      dataIndex: 'qt_maximum',
      key: 'qt_maximum',
      render: (value: string) => (
        <Box params={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BiMessageSquareDetail size="24" color={theme.colors.blue} />
          <Text textDecoration="strong">{value}</Text>
        </Box>
      ),
    },
    {
      title: 'Obrigatórias (P1)',
      dataIndex: 'mandatory',
      key: 'mandatory',
      render: (value: string) => (
        <Box params={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BiMessageSquareDetail size="24" color={theme.colors.p1} />
          <Text textDecoration="strong">{value}</Text>
        </Box>
      ),
    },
    {
      title: 'Complementares (P2)',
      dataIndex: 'complementary',
      key: 'complementary',
      render: (value: string) => (
        <Box params={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BiMessageSquareDetail size="24" color={theme.colors.p2} />
          <Text textDecoration="strong">{value}</Text>
        </Box>
      ),
    },
    {
      title: 'Opcionais (P3)',
      dataIndex: 'optional',
      key: 'optional',
      render: (value: string) => (
        <Box params={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <BiMessageSquareDetail size="24" color={theme.colors.p3} />
          <Text textDecoration="strong">{value}</Text>
        </Box>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: () => (
        <ColumnButton onClick={() => console.log('')}>
          <AiOutlineRight size="24" />
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
        <Title level={3}>Perguntas</Title>
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
            onClick={handleCreateQuestion}
            variant="primary"
          >
            Cadastrar Perguntas
          </Button>
        </Box>
      </Box>

      <Row>
        <Col xs>
          <Table
            rowType="modern"
            items={dimensions}
            isLoading={isLoading}
            fields={tableFields}
          />
        </Col>
      </Row>

      <CreateQuestion isModalOpen={isModalOpen} onClose={handleCloseModal} />

      {/* <Row end="xs">
        <Pagination onChange={handlePagination} totalItems={30} pageSize={5} />
      </Row> */}
    </Box>
  );
};

export default Questions;
