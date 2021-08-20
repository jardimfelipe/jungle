import React, { useState } from 'react';
import { Box, Typography } from '../..';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import { GoPrimitiveDot } from 'react-icons/go';
import {
  ArrowBox,
  CenterDot,
  ChartContainer,
  LineContainer,
  SpecialistButton,
  TextContainer,
  YouAreHereContainer,
} from './ResultLine.styled';
import useMobileWidth from '../../../hooks/useMobileWidth';
import { useTheme } from 'styled-components';
import { ResultLineProps } from './ResultLine.types';

const { Text } = Typography;
const ResultLine: React.FC<ResultLineProps> = ({
  results,
  type,
  hasAnalysis = true,
  maxText,
  minText,
}) => {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const isMobile = useMobileWidth();
  const theme = useTheme();

  const getUserPosition = () => {
    if (results.total < 50) return results.total + 10;
    if (results.total === 50) return results.total;
    return results.total - 10;
  };

  const handleClick = () => {
    setShowAnalysis(!showAnalysis);
  };
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <ChartContainer>
        <TextContainer className="left-text">
          <Text>{minText}</Text>
        </TextContainer>

        <LineContainer className="chart">
          <CenterDot>
            <Text>{type}</Text>
            <GoPrimitiveDot size="24px" />
          </CenterDot>

          <ArrowBox>
            <FiArrowLeft size="32" color="#4ED9A7" />
          </ArrowBox>
          <ArrowBox>
            <FiArrowRight size="32" color={theme.colors.blue} />
          </ArrowBox>

          <YouAreHereContainer position={`${getUserPosition()}%`}>
            <GoPrimitiveDot size="18px" />
            {!isMobile && <Text>Você está aqui</Text>}
          </YouAreHereContainer>
        </LineContainer>
        <TextContainer className="right-text">
          <Text>{maxText}</Text>
        </TextContainer>
      </ChartContainer>
      {isMobile && (
        <Box params={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <GoPrimitiveDot size="18px" color={theme.colors.blue} />
          <Text>Você está aqui</Text>
        </Box>
      )}
      {hasAnalysis && (
        <>
          <SpecialistButton onClick={handleClick}>
            Análise dos especialistas:
            {showAnalysis ? (
              <BiCaretUp color={theme.colors.darkGray} />
            ) : (
              <BiCaretDown color={theme.colors.darkGray} />
            )}
          </SpecialistButton>
          {showAnalysis && (
            <Text color={theme.colors.darkGray}>{results.analise}</Text>
          )}
        </>
      )}
    </Box>
  );
};

export default ResultLine;
