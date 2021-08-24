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
          <TableImage src={object.image} alt={object.image} />
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
      dataIndex: 'completed',
      key: 'completed',
      render: (value) => (
        <TableContainer>
          <ChartWrapper>
            <TableChart
              data={{
                datasets: [
                  {
                    label: null,
                    data: [value * 100, value * 100 - 100],
                    backgroundColor: ['#4ED9A7', '#F1F5FA'],
                    borderWidth: 0,
                  },
                ],
              }}
            />
            <Text textDecoration="strong">{(value * 100).toFixed(0)}%</Text>
          </ChartWrapper>
          <Text>Preenchimento</Text>
        </TableContainer>
      ),
    },
    {
      title: 'Ativo',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (value) => value || new Date().toLocaleDateString('pt-br'),
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
