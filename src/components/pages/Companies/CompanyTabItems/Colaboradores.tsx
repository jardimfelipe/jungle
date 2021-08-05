import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { ColumnButton, Pagination, Select, Table } from '../../..';
import { AiOutlineRight } from 'react-icons/ai';
import { Field } from '../../../molecules/Table/table.types';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { getCompanyRequest } from '../../../../store/modules/companies/actions';
import { useParams } from 'react-router-dom';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Colaboradores: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { company, isLoading } = useSelector(
    ({ companies }: RootState) => companies
  );

  const [pageNumber, setPageNumber] = useState(1);

  const handlePagination = (_: number, newPage: number) => {
    setPageNumber(newPage);
  };

  useEffect(() => {
    dispatch(getCompanyRequest({ pageNumber, headers: { company: id } }));
  }, [dispatch, pageNumber, id]);

  const tableFields: Field[] = [
    {
      title: 'Colaborador',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Setor da empresa',
      dataIndex: 'sector',
      key: 'sector',
    },
    {
      title: 'Cargo / Função',
      dataIndex: 'job',
      key: 'job',
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
            isLoading={isLoading}
            items={company.workers}
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

export default Colaboradores;
