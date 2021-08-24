import React, { useEffect, useState } from 'react';

import {
  Box,
  IconButton,
  PromotionalCard,
  TabNavigation,
  Typography,
  Table,
  SearchInput,
} from '../../..';
import { BiSearch } from 'react-icons/bi';
import useMobileWidth from '../../../../hooks/useMobileWidth';

import { useDispatch, useSelector } from 'react-redux';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';
import { RootState } from '../../../../store';
import { setSnackbarOpen } from '../../../../store/modules/base/actions';
import { Questionary } from '../../../../store/modules/questionaries/types';

const { Title, Text } = Typography;

type TabComponents = 'Ativos' | 'inativos' | 'em breve';

const tableFields = [
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
    title: 'Respondentes',
    dataIndex: 'respondents',
    key: 'respondents',
  },
  {
    title: 'Responderam',
    dataIndex: 'replied',
    key: 'replied',
  },
  {
    title: 'Rastreio',
    dataIndex: '_id',
    key: '_id',
    render: () => <Text>16/06 a 20/07</Text>,
  },
];

const Questionaries: React.FC = () => {
  const dispatch = useDispatch();
  const { questionaries, feedback, isLoading } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const [currentTab, setCurrentTab] = useState<TabComponents>('Ativos');
  const isMobile = useMobileWidth();

  const handleTabClick = (tab: TabComponents) => {
    setCurrentTab(tab);
  };

  useEffect(() => {
    dispatch(
      getQuestionariesRequest({
        headers: {
          company: currentUser.company,
        },
      })
    );
  }, [dispatch, currentUser]);

  useEffect(() => {
    feedback.status === 'error' && dispatch(setSnackbarOpen(feedback.message));
  }, [feedback, dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title="Questionários disponíveis"
        text="Aqui você encontrará a relação de todos os questionários disponíveis, detalhes como o período para preenchimento além de poder acompanhar como está a participação da equipe!"
      />

      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Title level={3}>Questionários</Title>
        <Box
          params={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          {isMobile ? <SearchInput /> : <IconButton icon={<BiSearch />} />}
          <Box params={{ display: 'flex', gap: '15px' }}>
            <TabNavigation
              onClick={() => handleTabClick('Ativos')}
              isActive={currentTab === 'Ativos'}
            >
              Ativos
            </TabNavigation>
            <TabNavigation
              onClick={() => handleTabClick('inativos')}
              isActive={currentTab === 'inativos'}
            >
              Inativos
            </TabNavigation>
            <TabNavigation
              onClick={() => handleTabClick('em breve')}
              isActive={currentTab === 'em breve'}
            >
              Em breve
            </TabNavigation>
          </Box>
        </Box>
      </Box>

      <Table isLoading={isLoading} items={questionaries} fields={tableFields} />
    </Box>
  );
};

export default Questionaries;
