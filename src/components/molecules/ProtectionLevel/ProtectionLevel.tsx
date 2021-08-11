import React from 'react';

import { Box, Typography } from '../..';
import { BsQuestion } from 'react-icons/bs';
import { QuestionButton } from './ProtectionLevel.styled';
import { useTheme } from 'styled-components';
import ParamsInfos from './ParamsInfos';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { Statistics } from '../../../store/modules/results/types';

const { Text } = Typography;

const ProtectionLevel: React.FC<{ statistics: Statistics[] }> = ({
  statistics,
}) => {
  const theme = useTheme();
  const { currentUser } = useSelector(({ login }: RootState) => login);
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
          Níveis de proteção {currentUser.role === 'gestor' && 'da empresa'}
        </Text>
        <QuestionButton>
          <BsQuestion size="24" color={theme.colors.darkGray} />
        </QuestionButton>
      </Box>
      {statistics.map((item, index) =>
        index <= 4 ? (
          <ParamsInfos key={`params-${index}`} params={item} />
        ) : null
      )}
    </Box>
  );
};

export default ProtectionLevel;
