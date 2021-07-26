import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { ColumnButton, Pagination, Select, Table, Tag } from '../../..';
import { BiDotsVertical } from 'react-icons/bi';
import { Field } from '../../../molecules/Table/table.types';
import { TagColors } from '../../../atoms/Tag/Tag.types';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getCompanyRequest } from '../../../../store/modules/companies/actions';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Questionarios: React.FC = () => {
  const dispatch = useDispatch();
  const { company, isLoading } = useSelector(
    ({ companies }: RootState) => companies
  );
  const getTagColor = (value: string): TagColors => {
    if (value === 'ativo') return 'success';
    if (value === 'inativo') return 'error';
    if (value === 'em breve') return 'warning';
    return 'warning';
  };

  const [pageNumber, setPageNumber] = useState(1);

  const handlePagination = (_: number, newPage: number) => {
    setPageNumber(newPage);
  };

  useEffect(() => {
    dispatch(getCompanyRequest({ pageNumber }));
  }, [dispatch, pageNumber]);

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
    },
    {
      title: 'No de questões',
      dataIndex: 'numberOfQuestions',
      key: 'numberOfQuestions',
    },
    {
      title: 'Criado em',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Rastreio',
      dataIndex: 'track',
      key: 'track',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: string) => (
        <Tag size="large" color={getTagColor(value)}>
          {value}
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
            items={company.questionaries}
            isLoading={isLoading}
            fields={tableFields}
          />
        </Col>
      </Row>

      <Row end="xs">
        <Pagination onChange={handlePagination} totalItems={30} pageSize={5} />
      </Row>
    </React.Fragment>
  );
};

export default Questionarios;
