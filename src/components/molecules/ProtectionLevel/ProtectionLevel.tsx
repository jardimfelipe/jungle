import React from 'react';

import { Box, Typography, ProgressBar, IconButton } from '../..';
import { BsQuestion } from 'react-icons/bs';
import { BiFace, BiCaretDown } from 'react-icons/bi';
import {
  QuestionButton,
  ParamIcon,
  ParamInfos,
} from './ProtectionLevel.styled';
import { useTheme } from 'styled-components';

const { Text } = Typography;

const protectionLevelColors = {
  leve: '#FFAE33',
  moderada: '#0CC3E7',
  boa: '#4ED9A7',
};

const ProtectionLevel: React.FC = () => {
  const theme = useTheme();
  const protectionLevels = [
    'Depressão',
    'Ansiedade',
    'Burnout',
    'Uso de substâncias',
    'Estresse',
  ];
  const protectionLevelsStatistics = [30, 50, 60, 76, 90];
  const calculateProtectionLevel = (level: number) => {
    if (level <= 30) return 'leve';
    if (level > 30 && level <= 70) return 'moderada';
    if (level > 70) return 'boa';
    return 'boa';
  };
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text textDecoration="strong" variant="primary">
          Níveis de proteção
        </Text>
        <QuestionButton>
          <BsQuestion size="24" color={theme.colors.darkGray} />
        </QuestionButton>
      </Box>
      {protectionLevels.map((item, index) => (
        <Box
          params={{
            display: 'flex',
            justifyContent: 'space-between',
            height: '45px',
          }}
          key={`protection-levels-${index}`}
        >
          <ParamIcon>
            <BiFace color={theme.colors.darkGray} size="28" />
          </ParamIcon>

          <ParamInfos>
            <Text textDecoration="strong">{item}</Text>
            <Box params={{ display: 'flex', alignItems: 'flex-end' }}>
              <Text
                color={
                  protectionLevelColors[
                    calculateProtectionLevel(protectionLevelsStatistics[index])
                  ]
                }
                textDecoration="strong"
              >
                <small>
                  Proteção{' '}
                  {calculateProtectionLevel(protectionLevelsStatistics[index])}
                </small>
              </Text>
            </Box>
          </ParamInfos>
          <ProgressBar
            color={
              protectionLevelColors[
                calculateProtectionLevel(protectionLevelsStatistics[index])
              ]
            }
            currentValue={protectionLevelsStatistics[index]}
          />
          <IconButton
            icon={<BiCaretDown size="18px" color={theme.colors.darkGray} />}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ProtectionLevel;
