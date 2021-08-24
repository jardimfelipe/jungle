import React from 'react';

import {
  Box,
  ChartWrapper,
  Questionary,
  QuestionaryButton,
  TableChart,
  Tag,
  Typography,
} from '../..';
import { BiCaretRight } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { QuestionaryCardProps } from './QuestionaryCard.types';
import { QuestionaryTag } from './QuestionaryCard.styled';
import { getSavedState } from '../../../utils/localStorage';
import { UserAnswer } from '../../../store/modules/questionaries/types';
import { useTheme } from 'styled-components';
import { differenceInDays, isFuture } from 'date-fns';

const { Title, Text } = Typography;

type StartedQuestionary = {
  questionaryId: string;
  answers: UserAnswer[];
};

const QuestionaryCard: React.FC<QuestionaryCardProps> = ({
  questionary,
  onClick,
}) => {
  const theme = useTheme();
  const startedQuestionaries =
    getSavedState('worker.startedQuestionaries') || [];

  const isFilledQuestionary = () => {
    return !!startedQuestionaries.find(
      ({ questionaryId }: StartedQuestionary) =>
        questionaryId === questionary._id
    );
  };

  const getPercentage = () => {
    if (questionary.answered) return 100;
    const filledQuestionary = startedQuestionaries.find(
      ({ questionaryId }: StartedQuestionary) =>
        questionaryId === questionary._id
    );
    if (filledQuestionary) {
      const totalQuestions = questionary.question.length;
      const totalAnswers = filledQuestionary.answers.length;
      return (100 * totalAnswers) / totalQuestions;
    } else {
      return 0;
    }
  };
  const chartData = {
    datasets: [
      {
        label: null,
        data: [getPercentage(), 100 - getPercentage()],
        backgroundColor: ['#4ED9A7', '#F1F5FA'],
        borderWidth: 0,
      },
    ],
  };

  const isQuestionaryAvailableOnFuture = () => {
    return isFuture(new Date(questionary.tracking_start));
  };

  const handleClick = () => {
    if (isQuestionaryAvailableOnFuture()) return;
    onClick(questionary);
  };

  const getDateInfo = () => {
    if (isQuestionaryAvailableOnFuture()) {
      return `Disponível em ${differenceInDays(
        new Date(),
        new Date(questionary.tracking_start)
      )} dias`;
    } else {
      return new Date(questionary.tracking_end).toLocaleDateString('pt-br');
    }
  };
  return (
    <Questionary
      isFuture={isQuestionaryAvailableOnFuture()}
      className="questionary-card"
      image=""
    >
      <div style={{ display: 'flex' }}>
        <Tag style={{ zIndex: 2 }} color="primary" size="large">
          {questionary.dimension?.name || 'Ansiedade'}
        </Tag>
        {!questionary.answered && (
          <QuestionaryTag size="large">{getDateInfo()}</QuestionaryTag>
        )}
      </div>
      <Box params={{ display: 'flex', flexDirection: 'column' }}>
        <Title level={3}>{questionary.title}</Title>
        <Text color="#FFFFFF">
          <small>{questionary.question.length} questões</small>
        </Text>
      </Box>
      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        {questionary.answered ? (
          <Text color={theme.colors.p3}>Conferir respostas</Text>
        ) : (
          <QuestionaryButton onClick={handleClick}>
            <div>
              <BiCaretRight color="#ffffff" size="32" />
            </div>
            {isFilledQuestionary()
              ? 'Retomar questionário'
              : 'Iniciar questionário'}
          </QuestionaryButton>
        )}
        <ChartWrapper>
          <TableChart data={chartData} />
          <Text textDecoration="strong" color="#ffffff">
            {questionary.answered ? (
              <FaCheckCircle size={24} />
            ) : (
              `${chartData.datasets[0].data[0]}%`
            )}
          </Text>
        </ChartWrapper>
      </Box>
    </Questionary>
  );
};

export default QuestionaryCard;
