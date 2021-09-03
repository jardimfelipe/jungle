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
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

type TabComponents = 'Ativos' | 'inativos' | 'em breve';

const Questionaries: React.FC = () => {
  const { t } = useTranslation();
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
        userRole: 'gestor',
      })
    );
  }, [dispatch, currentUser]);

  useEffect(() => {
    feedback.status === 'error' && dispatch(setSnackbarOpen(feedback.message));
  }, [feedback, dispatch]);

  const tableFields = [
    {
      title: t('table.headers.title'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('table.headers.dimension'),
      dataIndex: 'dimension',
      key: 'dimension',
      render: (value: Questionary['dimension']) => <Text>{value?.name}</Text>,
    },
    {
      title: t('table.headers.questionNumber'),
      dataIndex: 'question',
      key: 'question',
      render: (value: Questionary['question']) => (
        <Text>
          {value.length} {t('questions')}
        </Text>
      ),
    },
    {
      title: t('table.headers.respondents'),
      dataIndex: 'respondents',
      key: 'respondents',
    },
    {
      title: t('table.headers.replied'),
      dataIndex: 'replied',
      key: 'replied',
    },
    {
      title: t('table.headers.track'),
      dataIndex: '_id',
      key: '_id',
      render: () => <Text>16/06 a 20/07</Text>,
    },
  ];
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title={t('availableQuestionaries')}
        text={t('greetings.questionnaires.gestor.text')}
      />

      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Title level={3}>{t('pages.title.questionaries')}</Title>
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
              {t('button.actives')}
            </TabNavigation>
            <TabNavigation
              onClick={() => handleTabClick('inativos')}
              isActive={currentTab === 'inativos'}
            >
              {t('button.inactives')}
            </TabNavigation>
            <TabNavigation
              onClick={() => handleTabClick('em breve')}
              isActive={currentTab === 'em breve'}
            >
              {t('button.soon')}
            </TabNavigation>
          </Box>
        </Box>
      </Box>

      <Table isLoading={isLoading} items={questionaries} fields={tableFields} />
    </Box>
  );
};

export default Questionaries;
