import React from 'react';

import { Col, Row } from 'react-flexbox-grid';
import {
  Box,
  Button,
  IconButton,
  Select,
  Typography,
  CompanyTable,
} from '../..';
import { BiSearch } from 'react-icons/bi';
import { BiBuildings, BiDockLeft } from 'react-icons/bi';
import PromotionalCard from '../../molecules/PromotionalCard/PromotionalCard';
import { FilterLink } from './Companies.styled';
import Resume from '../../molecules/Resume/Resume';

import { useHistory } from 'react-router-dom';

import { useTheme } from 'styled-components';
import { CompanyItem } from '../../../store';

const { Title } = Typography;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const Companies: React.FC = () => {
  const history = useHistory();
  const theme = useTheme();

  const resumeItems = [
    {
      name: 'Empresas',
      icon: <BiBuildings size="32" color={theme.colors.blue} />,
      total: 20,
    },
    {
      name: 'Questionários',
      icon: <BiDockLeft size="32" color="#3BC8E3" />,
      total: 200,
    },
    {
      name: 'Ativos',
      icon: <BiDockLeft size="32" color={theme.colors.p3} />,
      total: 60,
    },
    {
      name: 'Inativos',
      icon: <BiDockLeft size="32" color={theme.colors.p1} />,
      total: 140,
    },
  ];

  const handleTableClick = (company: CompanyItem) => {
    history.push({
      pathname: `/companies/company/${company.id}`,
      state: { company },
    });
  };

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
          <FilterLink isActive={true}>Ativas</FilterLink>
          <FilterLink isActive={false}>Inativas</FilterLink>
          <Box
            params={{
              display: 'flex',
              alignItems: 'center',
              flex: '0 0 60%',
            }}
          >
            <Button block size="small" variant="primary">
              Cadastrar Empresas
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
          <Resume items={resumeItems} />
        </Col>
      </Row>

      <CompanyTable onClick={handleTableClick} />
    </Box>
  );
};

export default Companies;
