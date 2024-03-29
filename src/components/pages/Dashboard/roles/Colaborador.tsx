import React, { useEffect, useState } from 'react';

import {
  Box,
  NavigationButton,
  PromotionalCard,
  Typography,
  QuestionaryModal,
  QuestionaryCard,
  QuestionaryEmptyState,
  TermsConditionsModal,
} from '../../..';
import { BsArrowRight } from 'react-icons/bs';
import { QuestionariesGridContainer } from '../Dashboard.styled';
import Skeleton from 'react-loading-skeleton';
import ProgressBar from '@ramonak/react-progress-bar';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';
import { setSnackbarOpen } from '../../../../store/modules/base/actions';
import { Questionary as QuestionaryType } from '../../../../store/modules/questionaries/types';
import { getDimensionsRequest } from '../../../../store/modules/dimensions/actions';
import { useTheme } from 'styled-components';
import { rgba } from 'polished';
import { useTranslation } from 'react-i18next';

const { Title, Text } = Typography;

const Colaborador: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentUser } = useSelector((state: RootState) => state.login);
  const [clickedQuestionary, setClickedQuestionary] = useState<
    Partial<QuestionaryType>
  >({});
  const {
    questionaries,
    feedback,
    isLoading: isQuestionaryLoading,
  } = useSelector(({ questionaries }: RootState) => questionaries);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const getPercentage = () => {
    const answered = questionaries.filter((q) => q.answered).length;
    const total = questionaries.length;
    return (100 * answered) / total;
  };

  useEffect(() => {
    dispatch(getQuestionariesRequest({ userRole: 'user' }));
    dispatch(getDimensionsRequest());
  }, [dispatch]);

  useEffect(() => {
    feedback.status === 'error' && dispatch(setSnackbarOpen(feedback.message));
  }, [feedback, dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title={`${t('greetings.user.title')}, ${currentUser.name}.`}
        text={t('greetings.user.text')}
      />

      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3}>{t('pages.title.questionaries')}</Title>
        <NavigationButton onClick={() => history.push('/questionaries')}>
          <Text>{t('button.seeAll')}</Text> <BsArrowRight />
        </NavigationButton>
      </Box>
      {questionaries.length > 0 && (
        <Box params={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <Box params={{ display: 'block', width: '150px' }}>
            <ProgressBar
              bgColor={theme.colors.blue}
              height="8px"
              completed={getPercentage()}
              baseBgColor={rgba(theme.colors.blue, 0.1)}
              isLabelVisible={false}
            />
          </Box>
          <Text variant="primary">
            <strong>{questionaries.filter((q) => q.answered).length}</strong> de{' '}
            <strong>{questionaries.length}</strong> {t('pages.filled')}
          </Text>
        </Box>
      )}
      <QuestionariesGridContainer>
        {isQuestionaryLoading ? (
          <>
            {[...Array(3)].map((_, index) => (
              <Box
                key={`questionaries-grid-skeleton${index}`}
                params={{ display: 'block' }}
              >
                <Skeleton height={200} />
              </Box>
            ))}
          </>
        ) : questionaries.length ? (
          questionaries.map(
            (questionary, index) =>
              index < 3 && (
                <QuestionaryCard
                  onClick={handleQuestionaryClick}
                  questionary={questionary}
                  key={questionary._id}
                />
              )
          )
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
      <TermsConditionsModal />
    </Box>
  );
};

export default Colaborador;
