import React, { useEffect, useState } from 'react';

import {
  Box,
  NavigationButton,
  PromotionalCard,
  Typography,
  Tag,
  ChartWrapper,
  TableChart,
  Questionary,
  QuestionaryButton,
  QuestionaryModal,
} from '../../..';
import { BiCaretRight } from 'react-icons/bi';
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

const chartData = {
  datasets: [
    {
      label: null,
      data: [0, 100],
      backgroundColor: ['#4ED9A7', '#F1F5FA'],
      borderWidth: 0,
    },
  ],
};

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
        ) : (
          questionaries.map((questionary) => (
            <Questionary key={questionary._id} image="">
              <div style={{ display: 'flex' }}>
                <Tag size="large">{questionary.dimension?.name}</Tag>
              </div>
              <Box params={{ display: 'flex', flexDirection: 'column' }}>
                <Title level={3}>{questionary.title}</Title>
                <Text color="#FFFFFF">
                  <small>{questionary.question.length} questões</small>
                </Text>
              </Box>
              <Box
                params={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <QuestionaryButton
                  onClick={() => handleQuestionaryClick(questionary)}
                >
                  <div>
                    <BiCaretRight color="#ffffff" size="32" />
                  </div>
                  Iniciar questionário
                </QuestionaryButton>
                <ChartWrapper>
                  <TableChart data={chartData} />
                  <Text textDecoration="strong" color="#ffffff">
                    0%
                  </Text>
                </ChartWrapper>
              </Box>
            </Questionary>
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

export default Colaborador;
