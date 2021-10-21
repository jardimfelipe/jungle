import React from 'react';

import { Box, Typography } from '../..';
import {
  MobileSliderContainer,
  QuestionItem,
  SliderButton,
} from './QuestionarySlider.styled';
import ProgressBar from '@ramonak/react-progress-bar';
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi';

import { QuestionarySliderProps } from './QuestionarySlider.types';
import useMobileWidth from '../../../hooks/useMobileWidth';

const { Text } = Typography;

const QuestionarySlider: React.FC<QuestionarySliderProps> = ({
  totalQuestions,
  currentQuestion,
  onClickNext,
  onClickPrev,
}) => {
  const isMobile = useMobileWidth();
  const getPercentage = () => {
    const fixedCurrentQuestion = currentQuestion + 1;
    const percentage = (100 * fixedCurrentQuestion) / totalQuestions;
    return percentage.toFixed();
  };
  return isMobile ? (
    <MobileSliderContainer>
      <Box
        params={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flex: '0 0 70%',
        }}
      >
        <Box params={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>Progresso</Text>
          <Text>
            {getPercentage()}% - {currentQuestion + 1}/{totalQuestions}
          </Text>
        </Box>
        <Box params={{ display: 'block', width: '100%' }}>
          <ProgressBar
            bgColor={'#50DAA8'}
            height="15px"
            completed={getPercentage()}
            baseBgColor="#ffffff"
            isLabelVisible={false}
          />
        </Box>
      </Box>

      <Box
        params={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '0 0 30%',
        }}
      >
        <SliderButton onClick={onClickPrev} variant="secondary">
          <BiUpArrowAlt />
        </SliderButton>
        <SliderButton onClick={onClickNext} variant="primary">
          <BiDownArrowAlt />
        </SliderButton>
      </Box>
    </MobileSliderContainer>
  ) : (
    <Box params={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
      <Text>{getPercentage()}%</Text>
      {[...Array(totalQuestions)].map((_, index) => (
        <QuestionItem
          key={`slide-question-${index}`}
          isCurrentQuestion={index <= currentQuestion}
        />
      ))}
      <Text textDecoration="strong">
        {currentQuestion + 1}/{totalQuestions}
      </Text>
    </Box>
  );
};

export default QuestionarySlider;
