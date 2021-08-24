import React, { useEffect, useState } from 'react';

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
import { BsArrowLeft } from 'react-icons/bs';
import { BiDockLeft, BiSearch } from 'react-icons/bi';
import { Colaboradores, Questionarios } from './CompanyTabItems';

import { useHistory, useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { TabNavigation } from './Companies.styled';
import { CompanyItem, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyRequest } from '../../../store/modules/companies/actions';
import InsertQuestionary from './Modals/InsertQuestionary';

const { Text, Title } = Typography;

type TabComponents = 'questionarios' | 'colaboradores';
type RouteState = {
  company: CompanyItem;
};

const Company: React.FC = () => {
  const {
    state: { company: routeCompany },
  } = useLocation<RouteState>();
  const { company, isLoading } = useSelector(
    ({ companies }: RootState) => companies
  );
  const history = useHistory();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<TabComponents>('questionarios');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const companyItems = [
    {
      name: 'Colaboradores',
      icon: <FiUsers size="32" color={theme.colors.blue} />,
      total: routeCompany.collaborators,
    },
    {
      name: 'Questionários',
      icon: <BiDockLeft size="32" color="#3BC8E3" />,
      total: routeCompany.questionnaires,
    },
    {
      name: 'Ativos',
      icon: <BiDockLeft size="32" color={theme.colors.p3} />,
      total: routeCompany.questionnaires,
    },
    {
      name: 'Inativos',
      icon: <BiDockLeft size="32" color={theme.colors.p1} />,
      total: company.questionaries.filter(({ active }) => !active).length,
    },
  ];

  const handleBackButton = () => {
    history.goBack();
  };

  const handleTabClick = (tab: TabComponents) => {
    setCurrentTab(tab);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const headers = {
      company: routeCompany.id,
    };
    dispatch(getCompanyRequest({ headers }));
  }, [dispatch, routeCompany]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Card size="small" hasCloseButton background="#E5EEF7">
        <Title variant="primary" level={3}>
          Você está visualizando as informações da {routeCompany.name}
        </Title>
      </Card>

      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        <NavigationButton onClick={handleBackButton}>
          <BsArrowLeft />
          <Text>Voltar</Text>
        </NavigationButton>
        {/* <NavigationButton textColor="primary">
          <Text>Editar Cadastro</Text>
          <BsArrowRight />
        </NavigationButton> */}
      </Box>

      <Resume
        company={{
          name: routeCompany.name,
          image: routeCompany.image,
        }}
        items={companyItems}
        date="15/06/2021"
        filled={70}
      />

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
                <Button
                  block
                  onClick={handleOpenModal}
                  size="small"
                  variant="primary"
                >
                  Cadastrar Questionários
                </Button>
              </Box>
            )}
          </Box>
        </Col>
      </Row>
      <InsertQuestionary isOpen={isModalOpen} onClose={handleClose} />
      {currentTab === 'questionarios' ? (
        <Questionarios company={company} isLoading={isLoading} />
      ) : (
        <Colaboradores company={company} isLoading={isLoading} />
      )}
    </Box>
  );
};

export default Company;
