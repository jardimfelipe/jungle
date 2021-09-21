import React, { useState } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { ColumnButton, ConfirmationModal, Table, TableMenu } from '../../..';
import { Field } from '../../../molecules/Table/table.types';

import { TabItemsProps } from './CompanyTabItems.types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useTheme } from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteUsersRequest } from '../../../../store/modules/users/actions';
import { useLocation } from 'react-router-dom';
import { CompanyItem } from '../../../../store';
type RouteState = {
  company: CompanyItem;
};

const Colaboradores: React.FC<TabItemsProps> = ({ company, isLoading }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const tableMenuItems = [
    {
      title: 'Excluir',
      onClick: () => handleDeleteClick(),
      isDanger: true,
    },
  ];
  const {
    state: { company: routeCompany },
  } = useLocation<RouteState>();

  const tableFields: Field[] = [
    {
      title: 'Colaborador',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Setor da empresa',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Cargo / Função',
      dataIndex: 'office',
      key: 'office',
    },
    {
      title: 'Data de admissão',
      dataIndex: 'admission',
      key: 'admission',
    },
    {
      title: 'Questionários Respondidos',
      dataIndex: 'answeredQuestionaries',
      key: 'answeredQuestionaries',
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

  const [currentOpenMenu, setCurrentOpenMenu] = useState(-1);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handleTableButtonClick = (index: number) => {
    setCurrentOpenMenu(index);
  };

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseButton = () => {
    setCurrentOpenMenu(-1);
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleFeedbackClick = (value: boolean) => {
    if (value) {
      dispatch(
        deleteUsersRequest({
          user: company.workers[currentOpenMenu],
          company: routeCompany.id,
        })
      );
    }
    setIsConfirmationModalOpen(false);
    setCurrentOpenMenu(-1);
  };
  return (
    <React.Fragment>
      <Row>
        <Col xs>
          <Table
            isLoading={isLoading}
            items={company.workers.filter((w) => w.active)}
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

export default Colaboradores;
