import React, { useEffect, useState } from 'react';

import {
  Box,
  IconButton,
  PromotionalCard,
  TabNavigation,
  Typography,
  QuestionaryCard,
  SearchInput,
  QuestionaryModal,
} from '../../..';
import { BiSearch } from 'react-icons/bi';
import { QuestionariesGridContainer } from '../Questionaries.styled';
import useMobileWidth from '../../../../hooks/useMobileWidth';

import { useDispatch, useSelector } from 'react-redux';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';
import { RootState } from '../../../../store';
import Skeleton from 'react-loading-skeleton';
import { setSnackbarOpen } from '../../../../store/modules/base/actions';
import { useHistory } from 'react-router-dom';
import { Questionary as QuestionaryType } from '../../../../store/modules/questionaries/types';

const { Title } = Typography;

type TabComponents = 'disponiveis' | 'em andamento' | 'finalizados';

const Questionaries: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { questionaries, feedback, isLoading } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );
  const [currentTab, setCurrentTab] = useState<TabComponents>('disponiveis');
  const [clickedQuestionary, setClickedQuestionary] = useState<
    Partial<QuestionaryType>
  >({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMobileWidth();

  const handleTabClick = (tab: TabComponents) => {
    setCurrentTab(tab);
  };

  const handleQuestionaryClick = (questionary: QuestionaryType) => {
    setIsModalOpen(true);
    setClickedQuestionary(questionary);
  };

  const handleStartQuestionary = () => {
    if (!clickedQuestionary._id) return;
    history.push({
      pathname: `/questionaries/application/${clickedQuestionary?._id}`,
      state: { questionary: clickedQuestionary },
    });
  };

  useEffect(() => {
    dispatch(getQuestionariesRequest());
  }, [dispatch]);

  useEffect(() => {
    feedback.status === 'error' && dispatch(setSnackbarOpen(feedback.message));
  }, [feedback, dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />

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
              onClick={() => handleTabClick('disponiveis')}
              isActive={currentTab === 'disponiveis'}
            >
              Disponíveis
            </TabNavigation>
            <TabNavigation
              onClick={() => handleTabClick('em andamento')}
              isActive={currentTab === 'em andamento'}
            >
              Em andamento
            </TabNavigation>
            <TabNavigation
              onClick={() => handleTabClick('finalizados')}
              isActive={currentTab === 'finalizados'}
            >
              Finalizados
            </TabNavigation>
          </Box>
        </Box>
      </Box>

      <QuestionariesGridContainer>
        {isLoading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <Box key={`loader-${index}`} params={{ display: 'block' }}>
                <Skeleton height={200} />
              </Box>
            ))}
          </>
        ) : (
          questionaries.map((questionary) => (
            <QuestionaryCard
              onClick={handleQuestionaryClick}
              questionary={questionary}
              key={questionary._id}
            />
          ))
        )}
      </QuestionariesGridContainer>
      <QuestionaryModal
        onClick={handleStartQuestionary}
        onClose={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />
    </Box>
  );
};

export default Questionaries;
