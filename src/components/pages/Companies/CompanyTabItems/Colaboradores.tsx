import React from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { ColumnButton, Table } from '../../..';
import { AiOutlineRight } from 'react-icons/ai';
import { Field } from '../../../molecules/Table/table.types';

import { TabItemsProps } from './CompanyTabItems.types';

const Colaboradores: React.FC<TabItemsProps> = ({ company, isLoading }) => {
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
      render: (value: string) => (
        <ColumnButton onClick={() => console.log(value)}>
          <AiOutlineRight size="24" />
        </ColumnButton>
      ),
    },
  ];
  return (
    <React.Fragment>
      <Row>
        <Col xs>
          <Table
            isLoading={isLoading}
            items={company.workers}
            fields={tableFields}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Colaboradores;
