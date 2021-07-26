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
import { BiHeart } from 'react-icons/bi';
import { FiBox } from 'react-icons/fi';
import { BiCaretRight } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { QuestionariesGridContainer, ResumeBox } from '../Dashboard.styled';
import Skeleton from 'react-loading-skeleton';

import { useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../store';
import { getResultsRequest } from '../../../../store/modules/results/actions';
import { getQuestionariesRequest } from '../../../../store/modules/questionaries/actions';
import { setSnackbarOpen } from '../../../../store/modules/base/actions';
import { Questionary as QuestionaryType } from '../../../../store/modules/questionaries/types';

const { Title, Text } = Typography;
const { Brain } = Icons;

const resultsIcons = {
  neuroticidade: <Brain color="#ffffff" />,
  amabilidade: <BiHeart />,
  abertura: <FiBox />,
};

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
  const { results, isLoading: isResumeLoading } = useSelector(
    (state: RootState) => state.results
  );
  const [clickedQuestionary, setClickedQuestionary] = useState<
    Partial<QuestionaryType>
  >({});
  const {
    questionaries,
    error,
    isLoading: isQuestionaryLoading,
  } = useSelector(({ questionaries }: RootState) => questionaries);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuestionaryClick = (questionary: QuestionaryType) => {
    setIsModalOpen(true);
    setClickedQuestionary(questionary);
  };

  const handleStartQuestionary = () => {
    if (!clickedQuestionary._id) return;
    history.push(`/questionaries/application/${clickedQuestionary?._id}`);
  };

  const handleResultClick = () => {
    history.push('/my-results');
  };

  useEffect(() => {
    dispatch(getResultsRequest());
    dispatch(getQuestionariesRequest());
  }, [dispatch]);

  useEffect(() => {
    error.status && dispatch(setSnackbarOpen(error.message));
  }, [error, dispatch]);
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
        {Object.keys(results).map(
          (props, index) =>
            props !== 'contato' &&
            (isResumeLoading ? (
              <Box params={{ display: 'block' }}>
                <Skeleton height={150} />
              </Box>
            ) : (
              <ResumeCard
                key={`results-${index}`}
                name={props}
                icon={resultsIcons[props as keyof typeof resultsIcons]}
                total={results[props as keyof typeof results].total}
                onClick={handleResultClick}
              />
            ))
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
              <Box params={{ display: 'block' }}>
                <Skeleton height={200} />
              </Box>
            ))}
          </>
        ) : (
          questionaries.map((questionary) => (
            <Questionary key={questionary._id} image="">
              <Box params={{ display: 'flex' }}>
                <Tag size="large">{questionary.dimension?.name}</Tag>
              </Box>
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
