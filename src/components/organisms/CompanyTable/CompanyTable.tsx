import React, { useEffect, useState } from 'react';

import {
  Table,
  TableChart,
  Typography,
  ChartWrapper,
  ColumnButton,
  Pagination,
} from '../..';
import { TableContainer, TableImage } from './CompanyTable.styled';
import { FiUsers } from 'react-icons/fi';
import { BiDockLeft } from 'react-icons/bi';
import { AiOutlineRight } from 'react-icons/ai';
import { Row, Col } from 'react-flexbox-grid';

import { Field } from '../../molecules/Table/table.types';
import { useTheme } from 'styled-components';

import { CompanyTableProps } from './CompanyTable.types';

import { useDispatch, useSelector } from 'react-redux';
import { CompanyItem, RootState } from '../../../store';
import { getCompaniesRequest } from '../../../store/modules/companies/actions';

const chartData = {
  datasets: [
    {
      label: null,
      data: [70, 30],
      backgroundColor: ['#4ED9A7', '#F1F5FA'],
      borderWidth: 0,
    },
  ],
};

const { Text } = Typography;

const CompanyTable: React.FC<CompanyTableProps> = ({
  onClick,
  hasPagination,
  hideHeader = false,
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { companies, isLoading } = useSelector(
    ({ companies }: RootState) => companies
  );

  const handlePagination = (_: number, newPage: number) => {
    setPageNumber(newPage);
  };

  useEffect(() => {
    dispatch(getCompaniesRequest({ pageNumber }));
  }, [dispatch, pageNumber]);

  const tableFields: Field[] = [
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
      render: (value, object: CompanyItem) => (
        <TableContainer>
          <TableImage
            src="https://media.glassdoor.com/sqll/382606/magazine-luiza-squarelogo-1564520166281.png"
            alt={object.image}
          />
          <Text textDecoration="strong" variant="primary">
            {object.name}
          </Text>
        </TableContainer>
      ),
    },
    {
      title: 'Colaboradores',
      dataIndex: 'collaborators',
      key: 'collaborators',
      render: (value) => (
        <TableContainer>
          <FiUsers size="24px" color={theme.colors.blue} />
          <Text>{value} Colaboradores</Text>
        </TableContainer>
      ),
    },
    {
      title: 'Questionários',
      dataIndex: 'questionnaires',
      key: 'questionnaires',
      render: (value) => (
        <TableContainer>
          <BiDockLeft size="24px" color={theme.colors.blue} />
          <Text>{value} Questionários</Text>
        </TableContainer>
      ),
    },
    {
      title: 'Preenchimento',
      dataIndex: 'filled',
      key: 'filled',
      render: (value) => (
        <TableContainer>
          <ChartWrapper>
            <TableChart data={chartData} />
            <Text textDecoration="strong">52%</Text>
          </ChartWrapper>
          <Text>Preenchimento</Text>
        </TableContainer>
      ),
    },
    {
      title: 'Ativo',
      dataIndex: 'active',
      key: 'active',
      render: () => '15/06/2021',
    },
    {
      title: '',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value, item) => (
        <ColumnButton onClick={() => onClick(item)}>
          <AiOutlineRight size="24" />
        </ColumnButton>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col xs>
          <Table
            rowType="modern"
            isLoading={isLoading}
            items={companies}
            fields={tableFields}
            hideHeader={hideHeader}
          />
        </Col>
      </Row>
      {hasPagination && (
        <Row end="xs">
          <Pagination
            onChange={handlePagination}
            totalItems={30}
            pageSize={5}
          />
        </Row>
      )}
    </>
  );
};

export default CompanyTable;
