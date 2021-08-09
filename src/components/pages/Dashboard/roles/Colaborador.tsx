import React, { useEffect, useState } from 'react';

import {
  Box,
  NavigationButton,
  PromotionalCard,
  ResumeCard,
  Typography,
  Tag,
  ChartWrapper,
  TableChart,
  Questionary,
  QuestionaryButton,
  QuestionaryModal,
  Icons,
} from '../../..';
import { BiCaretRight } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { QuestionariesGridContainer, ResumeBox } from '../Dashboard.styled';
import Skeleton from 'react-loading-skeleton';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';
import { setSnackbarOpen } from '../../../../store/modules/base/actions';
import { Questionary as QuestionaryType } from '../../../../store/modules/questionaries/types';
import { getDimensionsRequest } from '../../../../store/modules/dimensions/actions';

const { Title, Text } = Typography;
const { Brain } = Icons;

const chartData = {
  datasets: [
    {
      label: null,
      data: [70, 30],
      backgroundColor: ['#4ED9A7', '#F1F5FA'],
      borderWidth: 0,
    },
  ],
};

const Colaborador: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { dimensions, isLoading: isResumeLoading } = useSelector(
    (state: RootState) => state.dimensions
  );
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

  const handleResultClick = () => {
    history.push('/my-results');
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
      <PromotionalCard />

      <Box params={{ display: 'fex', justifyContent: 'space-between' }}>
        <Title level={3}>Seus resultados</Title>
        <NavigationButton onClick={() => history.push('/my-results')}>
          <Text>Ver todos </Text> <BsArrowRight />
        </NavigationButton>
      </Box>

      <ResumeBox>
        {dimensions.map((dimension, index) =>
          isResumeLoading ? (
            <Box
              key={`skeleton-results-${index}`}
              params={{ display: 'block' }}
            >
              <Skeleton height={150} />
            </Box>
          ) : (
            <ResumeCard
              key={`results-${index}`}
              name={dimension.name}
              icon={<Brain color="#ffffff" />}
              total={80}
              onClick={handleResultClick}
            />
          )
        )}
      </ResumeBox>

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
                {questionary.done && (
                  <ChartWrapper>
                    <TableChart data={chartData} />
                    <Text textDecoration="strong" color="#ffffff">
                      62%
                    </Text>
                  </ChartWrapper>
                )}
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
