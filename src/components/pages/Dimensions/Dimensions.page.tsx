import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-flexbox-grid';

import {
  Box,
  Button,
  ColumnButton,
  ConfirmationModal,
  IconButton,
  // Pagination,
  PromotionalCard,
  Table,
  TableMenu,
  Typography,
} from '../..';
import { BiSearch } from 'react-icons/bi';
import { useTheme } from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import {
  deleteDimensionsRequest,
  getDimensionsRequest,
} from '../../../store/modules/dimensions/actions';
import DimensionForm from './Modals/Dimension.form';
import FeedbackModal from './Modals/FeedbackModal';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Field } from '../../molecules/Table/table.types';

const { Title, Text } = Typography;

const Dimensions: React.FC = () => {
  const dispatch = useDispatch();
  const { dimensions, isLoading } = useSelector(
    ({ dimensions }: RootState) => dimensions
  );
  const [currentOpenMenu, setCurrentOpenMenu] = useState(-1);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const tableMenuItems = [
    {
      title: 'Excluir',
      onClick: () => handleDeleteClick(),
      isDanger: true,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleCreateDimension = () => {
    setIsModalOpen(true);
  };

  const handleTableButtonClick = (index: number) => {
    setCurrentOpenMenu(index);
  };

  const handleCloseButton = () => {
    setCurrentOpenMenu(-1);
  };

  const handleFeedbackClick = (value: boolean) => {
    if (value) {
      dispatch(deleteDimensionsRequest(dimensions[currentOpenMenu]._id));
    }
    setIsConfirmationModalOpen(false);
    setCurrentOpenMenu(-1);
  };

  // const [pageNumber, setPageNumber] = useState(1);

  // const handlePagination = (_: number, newPage: number) => {
  //   setPageNumber(newPage);
  // };
  const theme = useTheme();

  useEffect(() => {
    dispatch(getDimensionsRequest());
  }, [dispatch]);

  const tableFields: Field[] = [
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
      render: (value, object, index) => (
        <>
          <TableMenu
            onClose={() => handleCloseButton()}
            isOpen={currentOpenMenu === index}
            menuItems={tableMenuItems}
            itemIndex={index}
          />
          <ColumnButton onClick={() => handleTableButtonClick(index)}>
            <BsThreeDotsVertical color={theme.colors.black} size="24" />
          </ColumnButton>
        </>
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
        <Col xs>
          <Table
            items={dimensions}
            isLoading={isLoading}
            fields={tableFields}
          />
        </Col>
      </Row>

      <DimensionForm isModalOpen={isModalOpen} onClose={handleModalClose} />
      <FeedbackModal />

      <ConfirmationModal
        onFeedbackClick={handleFeedbackClick}
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationModalClose}
      />

      {/* <Row end="xs">
        <Pagination onChange={handlePagination} totalItems={30} pageSize={5} />
      </Row> */}
    </Box>
  );
};

export default Dimensions;
