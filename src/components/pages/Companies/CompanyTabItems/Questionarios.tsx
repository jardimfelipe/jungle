import React, { useState } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import {
  ColumnButton,
  ConfirmationModal,
  Table,
  TableMenu,
  Tag,
  Typography,
} from '../../..';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Field } from '../../../molecules/Table/table.types';
// import { TagColors } from '../../../atoms/Tag/Tag.types';

import { Question } from '../../../../store/modules/questionaries/types';
import { TabItemsProps } from './CompanyTabItems.types';
import { CompanyItem, DimensionItem } from '../../../../store';
import { useTheme } from 'styled-components';
import { useDispatch } from 'react-redux';
import { removeTrackingRequest } from '../../../../store/modules/companies/actions';
import { useLocation } from 'react-router-dom';

const { Text } = Typography;

type RouteState = {
  company: CompanyItem;
};

const Questionarios: React.FC<TabItemsProps> = ({ company, isLoading }) => {
  // const getTagColor = (value: string): TagColors => {
  //   if (value === 'ativo') return 'success';
  //   if (value === 'inativo') return 'error';
  //   if (value === 'em breve') return 'warning';
  //   return 'warning';
  // };
  const {
    state: { company: routeCompany },
  } = useLocation<RouteState>();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [currentOpenMenu, setCurrentOpenMenu] = useState(-1);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const tableMenuItems = [
    {
      title: 'Excluir',
      onClick: () => handleDeleteClick(),
      isDanger: true,
    },
  ];
  const tableFields: Field[] = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Dimensão',
      dataIndex: 'dimension',
      key: 'dimension',
      render: (value: DimensionItem) => <Text>{value?.name}</Text>,
    },
    {
      title: 'No de questões',
      dataIndex: 'question',
      key: 'question',
      render: (value: Question[]) => <Text>{!!value ? value.length : 0}</Text>,
    },
    {
      title: 'Criado em',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: Question[]) => <Text>{value}</Text>,
    },
    {
      title: 'Rastreio',
      dataIndex: 'tracking_start',
      key: 'tracking_start',
      render: (value: string, object: any) => (
        <Text>
          {`${new Date(value).toLocaleDateString('pt-br')} - ${new Date(
            object.tracking_end
          ).toLocaleDateString('pt-br')}`}
        </Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (active) => (
        <Tag size="large" color={active ? 'success' : 'error'}>
          {active ? 'ativo' : 'inativo'}
        </Tag>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: (value: string, object: any, index: number) => (
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

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleTableButtonClick = (index: number) => {
    setCurrentOpenMenu(index);
  };

  const handleCloseButton = () => {
    setCurrentOpenMenu(-1);
  };

  const handleFeedbackClick = (value: boolean) => {
    if (value) {
      dispatch(
        removeTrackingRequest({
          trackingId: company.questionaries[currentOpenMenu].tracking,
          companyId: routeCompany.id,
        })
      );
    }
    setIsConfirmationModalOpen(false);
    setCurrentOpenMenu(-1);
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <React.Fragment>
      <Row>
        <Col xs>
          <Table
            items={company.questionaries}
            isLoading={isLoading}
            fields={tableFields}
          />
        </Col>
      </Row>

      <ConfirmationModal
        onFeedbackClick={handleFeedbackClick}
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationModalClose}
      />
    </React.Fragment>
  );
};

export default Questionarios;
