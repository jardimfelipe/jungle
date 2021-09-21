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
import { differenceInDays, isFuture, isPast } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export type StartedQuestionary = {
  questionaryId: string;
  answers: UserAnswer[];
};

const QuestionaryCard: React.FC<QuestionaryCardProps> = ({
  questionary,
  onClick,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
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
      const totalQuestions = !!questionary.question
        ? questionary.question.length
        : 0;
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

  const isQuestionaryAvailableOnPast = () => {
    return isPast(new Date(questionary.tracking_end));
  };

  const handleClick = () => {
    if (isQuestionaryAvailableOnFuture() || isQuestionaryAvailableOnPast())
      return;
    onClick(questionary);
  };

  const getDateInfo = () => {
    if (isQuestionaryAvailableOnFuture()) {
      return `${t('availableIn')} ${differenceInDays(
        new Date(questionary.tracking_start),
        new Date()
      )} dias`;
    } else if (isQuestionaryAvailableOnPast()) {
      return t('notAvailable');
    } else {
      return t('availableUntil', {
        date: new Date(questionary.tracking_end).toLocaleDateString('pt-br'),
      });
    }
  };
  return (
    <Questionary
      isFuture={
        isQuestionaryAvailableOnFuture() ||
        (isQuestionaryAvailableOnPast() && !questionary.answered)
      }
      className="questionary-card"
      image=""
    >
      <div style={{ display: 'flex' }}>
        <Tag style={{ zIndex: 2 }} color="primary" size="large">
          {questionary.dimension?.name || 'Ansiedade'}
        </Tag>
        {!questionary.answered && (
          <QuestionaryTag size="large"> {getDateInfo()}</QuestionaryTag>
        )}
      </div>
      <Box params={{ display: 'flex', flexDirection: 'column' }}>
        <Title level={3}>{questionary.title}</Title>
        <Text color="#FFFFFF">
          <small>{`${
            !!questionary.question ? questionary.question.length : 0
          } ${t('questions')}`}</small>
        </Text>
      </Box>
      <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
        {questionary.answered ? (
          <Link to="/my-results" style={{ color: theme.colors.p3 }}>
            {t('checkAnswers')}
          </Link>
        ) : (
          <QuestionaryButton onClick={handleClick}>
            <div>
              <BiCaretRight color="#ffffff" size="32" />
            </div>
            {isFilledQuestionary() ? t('resumeQuiz') : t('startQuestionarie')}
          </QuestionaryButton>
        )}
        <ChartWrapper>
          <TableChart data={chartData} />
          <Text textDecoration="strong" color="#ffffff">
            {questionary.answered ? (
              <FaCheckCircle size={24} />
            ) : (
              `${chartData.datasets[0].data[0].toFixed(0)}%`
            )}
          </Text>
        </ChartWrapper>
      </Box>
    </Questionary>
  );
};

export default QuestionaryCard;
