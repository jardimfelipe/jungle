import React, { useEffect, useState } from 'react';

import {
  Box,
  NavigationButton,
  PromotionalCard,
  Typography,
  QuestionaryModal,
  QuestionaryCard,
  QuestionaryEmptyState,
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

const { Title, Text } = Typography;

const Colaborador: React.FC = () => {
  const theme = useTheme();
  const history = useHistory();
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getQuestionariesRequest());
    dispatch(getDimensionsRequest());
  }, [dispatch]);

  useEffect(() => {
    feedback.status === 'error' && dispatch(setSnackbarOpen(feedback.message));
  }, [feedback, dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard
        title={`Estamos felizes em ver você, ${currentUser.name}.`}
        text="Todos nossos questionários são sigilosos, cientificamente validados,
        para que você tenha uma vida mais saudável e produtiva."
      />

      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title level={3}>Questionários</Title>
        <NavigationButton onClick={() => history.push('/questionaries')}>
          <Text>Ver todos </Text> <BsArrowRight />
        </NavigationButton>
      </Box>
      <Box params={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <Box params={{ display: 'block', width: '150px' }}>
          <ProgressBar
            bgColor={theme.colors.blue}
            height="8px"
            completed={0}
            baseBgColor={rgba(theme.colors.blue, 0.1)}
            isLabelVisible={false}
          />
        </Box>
        <Text variant="primary">
          <strong>0</strong> de <strong>10</strong> preenchidos
        </Text>
      </Box>
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
          questionaries.map((questionary) => (
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
      />
    </Box>
  );
};

export default Colaborador;
