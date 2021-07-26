import React from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { Box, Button, IconButton, Select, Table, Typography } from '../..';
import { BiSearch } from 'react-icons/bi';
import PromotionalCard from '../../molecules/PromotionalCard/PromotionalCard';

import { tableData, tableFields } from './table-workers.field';

const { Title } = Typography;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Companies: React.FC = () => {
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
        <Title level={3}>Empresas</Title>
        <Box
          params={{ display: 'flex', justifyContent: 'flex-end', gap: '15px' }}
        >
          <IconButton icon={<BiSearch />} />
          <Box
            params={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 60%',
            }}
          >
            <Button block size="small" variant="secondary">
              Baixar Planilhas
            </Button>
          </Box>
          <Box
            params={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 60%',
            }}
          >
            <Button block size="small" variant="primary">
              Cadastrar Usuários
            </Button>
          </Box>
        </Box>
      </Box>

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
          <Table items={tableData} fields={tableFields} />
        </Col>
      </Row>
    </Box>
  );
};

export default Companies;
