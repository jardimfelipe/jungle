import React from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { ColumnButton, Table, Tag, Typography } from '../../..';
import { BiDotsVertical } from 'react-icons/bi';
import { Field } from '../../../molecules/Table/table.types';
// import { TagColors } from '../../../atoms/Tag/Tag.types';

import { Question } from '../../../../store/modules/questionaries/types';
import { TabItemsProps } from './CompanyTabItems.types';
import { DimensionItem } from '../../../../store';

const { Text } = Typography;

const Questionarios: React.FC<TabItemsProps> = ({ company, isLoading }) => {
  // const getTagColor = (value: string): TagColors => {
  //   if (value === 'ativo') return 'success';
  //   if (value === 'inativo') return 'error';
  //   if (value === 'em breve') return 'warning';
  //   return 'warning';
  // };

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
      render: (value: Question[]) => <Text>{value.length}</Text>,
    },
    {
      title: 'Criado em',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: Question[]) => <Text>06/2021</Text>,
    },
    {
      title: 'Rastreio',
      dataIndex: 'track',
      key: 'track',
      render: () => <Text>06/2021</Text>,
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
      render: (value: string) => (
        <ColumnButton onClick={() => console.log(value)}>
          <BiDotsVertical size="24" />
        </ColumnButton>
      ),
    },
  ];
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
    </React.Fragment>
  );
};

export default Questionarios;
