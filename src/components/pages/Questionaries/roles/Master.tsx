import React, { useEffect, useState } from 'react';

import { Col, Row } from 'react-flexbox-grid';
import {
  Box,
  Button,
  Tag,
  Typography,
  Resume,
  TabNavigation,
  Table,
  TableMenu,
  ColumnButton,
  ConfirmationModal,
} from '../../../';
import { BiBuildings, BiDockLeft } from 'react-icons/bi';
import PromotionalCard from '../../../molecules/PromotionalCard/PromotionalCard';

import { useTheme } from 'styled-components';
import {
  deleteQuestionaryRequest,
  getQuestionariesRequest,
} from '../../../../store/modules/questionaries/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { Questionary } from '../../../../store/modules/questionaries/types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Field } from '../../../molecules/Table/table.types';
import CreateQuestionary from '../Modals/CreateQuestionary';
import { getCompaniesRequest } from '../../../../store/modules/companies/actions';
import { useHistory } from 'react-router';

const { Text } = Typography;

type PageTabs = 'questionarios' | 'templates' | 'rascunhos';

const Master: React.FC = () => {
  const history = useHistory();
  const { questionaries, isLoading } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );
  const tableMenuItems = [
    {
      title: 'Visualizar',
      onClick: (index: number) =>
        history.push(`/questionaries/edit/${questionaries[index]._id}`),
    },
    // {
    //   title: 'Editar',
    //   onClick: () => console.log('onClick'),
    // },
    // {
    //   title: 'Editar rastreio',
    //   onClick: () => console.log('onClick'),
    // },
    // {
    //   title: 'Resultados',
    //   onClick: () => console.log('onClick'),
    // },
    // {
    //   title: 'Duplicar',
    //   onClick: () => console.log('onClick'),
    // },
    {
      title: 'Ativar/Desativar',
      onClick: () => console.log('onClick'),
    },
    {
      title: 'Excluir',
      onClick: () => handleDeleteClick(),
      isDanger: true,
    },
  ];
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
      render: (value: Questionary['dimension']) => <Text>{value?.name}</Text>,
    },
    {
      title: 'Número de perguntas',
      dataIndex: 'question',
      key: 'question',
      render: (value: Questionary['question']) => (
        <Text>{value.length} perguntas</Text>
      ),
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
      dataIndex: 'respondents',
      key: 'respondents',
      render: (value, object, index) => (
        <>
          <TableMenu
            onClose={() => handleCloseButton()}
            isOpen={currentOpenMenu === index}
            menuItems={tableMenuItems}
            itemIndex={index}
          />
          <ColumnButton onClick={() => handleTableButtonClick(index)}>
            <BsThreeDotsVertical color={theme.colors.black} size="24" />
          </ColumnButton>
        </>
      ),
    },
  ];
  const [currentOpenMenu, setCurrentOpenMenu] = useState(-1);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<PageTabs>('questionarios');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { companies } = useSelector(({ companies }: RootState) => companies);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

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

  const handleDeleteClick = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleTableButtonClick = (index: number) => {
    setCurrentOpenMenu(index);
  };

  const handleCloseButton = () => {
    setCurrentOpenMenu(-1);
  };

  const handleCreateQuestionary = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleFeedbackClick = (value: boolean) => {
    if (value) {
      dispatch(deleteQuestionaryRequest(questionaries[currentOpenMenu]._id));
    }
    setIsConfirmationModalOpen(false);
    setCurrentOpenMenu(-1);
  };

  useEffect(() => {
    dispatch(getQuestionariesRequest());
    dispatch(getCompaniesRequest());
  }, [dispatch]);
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
        <Box params={{ display: 'flex', gap: '15px' }}>
          <TabNavigation
            onClick={() => setCurrentTab('questionarios')}
            isActive={currentTab === 'questionarios'}
          >
            Questionários
          </TabNavigation>
          <TabNavigation
            onClick={() => setCurrentTab('templates')}
            isActive={currentTab === 'templates'}
          >
            Templates
          </TabNavigation>
          <TabNavigation
            onClick={() => setCurrentTab('rascunhos')}
            isActive={currentTab === 'rascunhos'}
          >
            Rascunhos
          </TabNavigation>
        </Box>
        <Box
          params={{
            display: 'flex',
            alignItems: 'center',
            flex: '0 0 30%',
          }}
        >
          <Button
            onClick={handleCreateQuestionary}
            block
            size="small"
            variant="primary"
          >
            Cadastrar questionário
          </Button>
        </Box>
      </Box>

      <Row>
        <Col xs>
          <Resume items={resumeItems} />
        </Col>
      </Row>
      <CreateQuestionary isModalOpen={isModalOpen} onClose={handleClose} />
      <Table isLoading={isLoading} items={questionaries} fields={tableFields} />

      <ConfirmationModal
        onFeedbackClick={handleFeedbackClick}
        isOpen={isConfirmationModalOpen}
        onClose={handleConfirmationModalClose}
      />
    </Box>
  );
};

export default Master;
