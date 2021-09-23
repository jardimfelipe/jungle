import React, { useCallback, useEffect, useState } from 'react';

import {
  Box,
  IconButton,
  PromotionalCard,
  TabNavigation,
  Typography,
  QuestionaryCard,
  SearchInput,
  QuestionaryModal,
  QuestionaryEmptyState,
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

import { useTranslation } from 'react-i18next';
import { getSavedState } from '../../../../utils/localStorage';
import { StartedQuestionary } from '../../../molecules/QuestionaryCard/QuestionaryCard';
import { isFuture, isPast } from 'date-fns';

const { Title } = Typography;

type TabComponents = 'disponiveis' | 'em andamento' | 'finalizados';

const Questionaries: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { questionaries, feedback, isLoading } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );
  const [currentTab, setCurrentTab] = useState<TabComponents>('disponiveis');
  const [startedQuestionaries] = useState(
    getSavedState('worker.startedQuestionaries') || []
  );
  const [clickedQuestionary, setClickedQuestionary] = useState<
    Partial<QuestionaryType>
  >({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useMobileWidth();
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const [filteredQuestionaries, setFilteredQuestionaries] = useState<
    QuestionaryType[]
  >([]);
  const handleTabClick = (tab: TabComponents) => {
    setCurrentTab(tab);
  };

  const isFilledQuestionary = useCallback(
    (id: string) => {
      return !!startedQuestionaries.find(
        ({ questionaryId, userId }: StartedQuestionary) =>
          questionaryId === id && currentUser._id === userId
      );
    },
    [startedQuestionaries, currentUser]
  );

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
    dispatch(getQuestionariesRequest({ userRole: 'user' }));
  }, [dispatch]);

  useEffect(() => {
    feedback.status === 'error' && dispatch(setSnackbarOpen(feedback.message));
  }, [feedback, dispatch]);

  useEffect(() => {
    let q;
    switch (currentTab) {
      case 'disponiveis':
        q = questionaries.filter(
          (questionary) =>
            !questionary.answered &&
            !isFilledQuestionary(questionary._id) &&
            !isPast(new Date(questionary.tracking_end)) &&
            !isFuture(new Date(questionary.tracking_start))
        );
        setFilteredQuestionaries(q);
        break;

      case 'em andamento':
        q = questionaries.filter(
          (questionary) =>
            !questionary.answered &&
            isFilledQuestionary(questionary._id) &&
            !isPast(new Date(questionary.tracking_end)) &&
            !isFuture(new Date(questionary.tracking_start))
        );
        break;
      case 'finalizados':
        q = questionaries.filter((q) => q.answered);
        break;
      default:
        q = questionaries;
        break;
    }
    setFilteredQuestionaries(q);
  }, [currentTab, isFilledQuestionary, questionaries]);

  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title={t('greetings.questionnaires.colaborador.title')}
        text={t('greetings.questionnaires.colaborador.text')}
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
              onClick={() => handleTabClick('disponiveis')}
              isActive={currentTab === 'disponiveis'}
            >
              {t('button.availables')}
            </TabNavigation>
            <TabNavigation
              onClick={() => handleTabClick('em andamento')}
              isActive={currentTab === 'em andamento'}
            >
              {t('button.inProgress')}
            </TabNavigation>
            <TabNavigation
              onClick={() => handleTabClick('finalizados')}
              isActive={currentTab === 'finalizados'}
            >
              {t('button.done')}
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
        ) : questionaries.length ? (
          filteredQuestionaries.map((questionary) => (
            <QuestionaryCard
              onClick={handleQuestionaryClick}
              questionary={questionary}
              key={questionary._id}
            />
          ))
        ) : (
          <QuestionaryEmptyState />
        )}
      </QuestionariesGridContainer>
      <QuestionaryModal
        onClick={handleStartQuestionary}
        onClose={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
        questionaryTitle={clickedQuestionary.title || ''}
      />
    </Box>
  );
};

export default Questionaries;
