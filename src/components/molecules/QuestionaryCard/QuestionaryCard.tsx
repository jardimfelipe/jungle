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

const QuestionaryCard: React.FC<QuestionaryCardProps> = ({
  questionary,
  onClick,
}) => {
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
            0%
          </Text>
        </ChartWrapper>
      </Box>
    </Questionary>
  );
};

export default QuestionaryCard;
