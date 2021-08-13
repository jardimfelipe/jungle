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
import { QuestionaryCardProps } from './QuestionaryCard.types';
import { QuestionaryTag } from './QuestionaryCard.styled';
import { getSavedState } from '../../../utils/localStorage';
import { UserAnswer } from '../../../store/modules/questionaries/types';

const { Title, Text } = Typography;

type StartedQuestionary = {
  id: string;
  answers: UserAnswer[];
};

const QuestionaryCard: React.FC<QuestionaryCardProps> = ({
  questionary,
  onClick,
}) => {
  const startedQuestionaries =
    getSavedState('worker.startedQuestionaries') || [];

  const getPercentage = () => {
    const filledQuestionary = startedQuestionaries.find(
      ({ id }: StartedQuestionary) => id === questionary._id
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
        data: [getPercentage(), 100],
        backgroundColor: ['#4ED9A7', '#F1F5FA'],
        borderWidth: 0,
      },
    ],
  };
  return (
    <Questionary className="questionary-card" image="">
      <div style={{ display: 'flex' }}>
        <Tag style={{ zIndex: 2 }} color="primary" size="large">
          {questionary.dimension?.name || 'Ansiedade'}
        </Tag>
        <QuestionaryTag size="large">Disponível até 10/08/2021</QuestionaryTag>
      </div>
      <Box params={{ display: 'flex', flexDirection: 'column' }}>
        <Title level={3}>{questionary.title}</Title>
        <Text color="#FFFFFF">
          <small>{questionary.question.length} questões</small>
        </Text>
      </Box>
      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        <QuestionaryButton onClick={() => onClick(questionary)}>
          <div>
            <BiCaretRight color="#ffffff" size="32" />
          </div>
          Iniciar questionário
        </QuestionaryButton>
        <ChartWrapper>
          <TableChart data={chartData} />
          <Text textDecoration="strong" color="#ffffff">
            {chartData.datasets[0].data[0]}%
          </Text>
        </ChartWrapper>
      </Box>
    </Questionary>
  );
};

export default QuestionaryCard;
