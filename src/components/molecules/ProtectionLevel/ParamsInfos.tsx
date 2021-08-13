import React, { useState } from 'react';

import { ParamIcon, ParamInfosContainer } from './ProtectionLevel.styled';
import { BiFace, BiCaretDown, BiCaretUp } from 'react-icons/bi';
import ProgressBar from '@ramonak/react-progress-bar';
import { Box, Typography, IconButton } from '../..';
import { useTheme } from 'styled-components';
import { lighten } from 'polished';
import { Statistics } from '../../../store/modules/results/types';

const { Text } = Typography;
enum ProtectionLevelColors {
  'Proteção Leve' = '#FFAE33',
  'Proteção Boa' = '#4ED9A7',
  'Proteção Moderada' = '#0CC3E7',
  'Proteção Alta' = '#4ED9A7',
}

const ParamsInfos: React.FC<{ params: Statistics }> = ({ params }) => {
  const theme = useTheme();
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  const handleClick = () => {
    setIsAnalysisOpen(!isAnalysisOpen);
  };

  const icon = isAnalysisOpen ? (
    <BiCaretUp size="18px" color={theme.colors.darkGray} />
  ) : (
    <BiCaretDown size="18px" color={theme.colors.darkGray} />
  );
  return (
    <>
      <Box
        params={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '45px',
        }}
      >
        <ParamIcon>
          <BiFace color={theme.colors.darkGray} size="28" />
        </ParamIcon>

        <ParamInfosContainer>
          <Text textDecoration="strong">{params.name}</Text>
          <Box params={{ display: 'flex', alignItems: 'flex-end' }}>
            <Text
              color={ProtectionLevelColors[params.result]}
              textDecoration="strong"
            >
              <small>{params.result}</small>
            </Text>
          </Box>
          <ProgressBar
            bgColor={ProtectionLevelColors[params.result]}
            height="8px"
            completed={params.value}
            baseBgColor={lighten(0.35, ProtectionLevelColors[params.result])}
            isLabelVisible={false}
          />
        </ParamInfosContainer>
        <IconButton onClick={handleClick} icon={icon} />
      </Box>
      {isAnalysisOpen && (
        <small>
          <Text color={theme.colors.darkGray}>{params.description}</Text>
        </small>
      )}
    </>
  );
};

export default ParamsInfos;