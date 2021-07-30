import React, { useState } from 'react';

import {
  Typography,
  Card,
  Box,
  NavigationButton,
  IconButton,
  Button,
} from '../..';
import { Col, Row } from 'react-flexbox-grid';
import Resume from '../../molecules/Resume/Resume';
import { FiUsers } from 'react-icons/fi';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { BiDockLeft, BiSearch } from 'react-icons/bi';
import { Colaboradores, Questionarios } from './CompanyTabItems';

import { useHistory, useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { TabNavigation } from './Companies.styled';
import { CompanyItem } from '../../../store';

const { Text, Title } = Typography;

type TabComponents = 'questionarios' | 'colaboradores';
type RouteState = {
  company: CompanyItem;
};

const Company: React.FC = () => {
  const {
    state: { company },
  } = useLocation<RouteState>();
  const history = useHistory();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<TabComponents>('questionarios');

  const companyItems = [
    {
      name: 'Colaboradores',
      icon: <FiUsers size="32" color={theme.colors.blue} />,
      total: company.collaborators,
    },
    {
      name: 'Questionários',
      icon: <BiDockLeft size="32" color="#3BC8E3" />,
      total: company.questionnaires,
    },
    {
      name: 'Ativos',
      icon: <BiDockLeft size="32" color={theme.colors.p3} />,
      total: 12,
    },
    {
      name: 'Inativos',
      icon: <BiDockLeft size="32" color={theme.colors.p1} />,
      total: 12,
    },
  ];

  const handleBackButton = () => {
    history.goBack();
  };

  const handleTabClick = (tab: TabComponents) => {
    setCurrentTab(tab);
  };
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card size="small" hasCloseButton background="#E5EEF7">
        <Title variant="primary" level={3}>
          Você está visualizando as informações da {company.name}
        </Title>
      </Card>

      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        <NavigationButton onClick={handleBackButton}>
          <BsArrowLeft />
          <Text>Voltar</Text>
        </NavigationButton>
        <NavigationButton textColor="primary">
          <Text>Editar Cadastro</Text>
          <BsArrowRight />
        </NavigationButton>
      </Box>

      <Resume items={companyItems} date="15/06/2021" filled={70} />

      <Row middle="xs" between="xs">
        <Col xs>
          <Box params={{ display: 'flex' }}>
            <TabNavigation
              onClick={() => handleTabClick('questionarios')}
              isActive={currentTab === 'questionarios'}
            >
              Questionários
            </TabNavigation>
            <TabNavigation
              onClick={() => handleTabClick('colaboradores')}
              isActive={currentTab === 'colaboradores'}
            >
              Colaboradores
            </TabNavigation>
          </Box>
        </Col>

        <Col xs>
          <Box
            params={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton icon={<BiSearch />} />
            {currentTab === 'questionarios' && (
              <Box
                params={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: '0 0 60%',
                }}
              >
                <Button block size="small" variant="primary">
                  Cadastrar Questionários
                </Button>
              </Box>
            )}
          </Box>
        </Col>
      </Row>

      {currentTab === 'questionarios' ? <Questionarios /> : <Colaboradores />}
    </Box>
  );
};

export default Company;
