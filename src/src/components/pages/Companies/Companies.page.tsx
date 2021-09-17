import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { Box, IconButton, Typography, CompanyTable, Button } from '../..';
import { BiSearch } from 'react-icons/bi';
import { BiBuildings, BiDockLeft } from 'react-icons/bi';
import PromotionalCard from '../../molecules/PromotionalCard/PromotionalCard';
import { FilterLink } from './Companies.styled';
import Resume from '../../molecules/Resume/Resume';

import CreateCompany from './Modals/InsertCompany';


import  { useTranslation } from 'react-i18next'

import { useHistory } from 'react-router-dom';

import { useTheme } from 'styled-components';
import { CompanyItem, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionariesRequest } from '../../../store/modules/questionaries/actions';

const { Title } = Typography;

const Companies: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { t } = useTranslation();
  const { companies } = useSelector(({ companies }: RootState) => companies);
  const { questionaries } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );
  const  [isModalOpen, setIsModalOpen ] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  }

  const resumeItems = [
    {
      name: 'Empresas',
      icon: <BiBuildings size="32" color={theme.colors.blue} />,
      total: companies.length,
    },
    {
      name: 'Questionários',
      icon: <BiDockLeft size="32" color="#3BC8E3" />,
      total: questionaries.length,
    },
    {
      name: 'Ativos',
      icon: <BiDockLeft size="32" color={theme.colors.p3} />,
      total: questionaries.filter(({ active }) => active).length,
    },
    {
      name: 'Inativos',
      icon: <BiDockLeft size="32" color={theme.colors.p1} />,
      total: questionaries.filter(({ active }) => !active).length,
    },
  ];

  const handleTableClick = (company: CompanyItem) => {
    history.push({
      pathname: `/companies/company/${company.id}`,
      state: { company },
    });
  };

  useEffect(() => {
    dispatch(getQuestionariesRequest());
  }, [dispatch]);

  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title="Olá equipe Jungle!"
        text="Aqui você tem acesso a todas as empresas que participam de nossas jornadas e pode acompanhar o status dos projetos e o engajamento dos colaboradores."
      />

      <Box params={{
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '100%' 
      }}>
        <Button variant="primary" onClick={()=>{
          setIsModalOpen(true)
        }}>
          {`${t('companies.btnCompanies')}`}
        </Button>
      </Box>

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
        </Box>
      </Box>

      <Row>
        <Col xs>
          <Resume items={resumeItems} />
        </Col>
      </Row>

      <CompanyTable onClick={handleTableClick} />

      <CreateCompany onClose={handleModalClose} isModalOpen={isModalOpen} />
    </Box>
  );
};

export default Companies;
