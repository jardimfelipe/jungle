import React from 'react';

import { Box, Typography } from '../..';
import { BsQuestion } from 'react-icons/bs';
import { QuestionButton } from './ProtectionLevel.styled';
import { useTheme } from 'styled-components';
import ParamsInfos from './ParamsInfos';
import Skeleton from 'react-loading-skeleton';

import { Statistics } from '../../../store/modules/results/types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const { Text } = Typography;

const ProtectionLevel: React.FC<{ statistics: Statistics[] }> = ({
  statistics,
}) => {
  const { isLoading } = useSelector((state: RootState) => state.results);
  const theme = useTheme();
  const { t } = useTranslation();
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
          {t('pages.title.protecionLevels')}
        </Text>
        <QuestionButton>
          <BsQuestion size="24" color={theme.colors.darkGray} />
        </QuestionButton>
      </Box>
      {isLoading
        ? [...Array(5)].map((_) => <Skeleton height={40} />)
        : statistics.map((item, index) =>
            index <= 4 ? (
              <ParamsInfos key={`params-${index}`} params={item} />
            ) : null
          )}
    </Box>
  );
};

export default ProtectionLevel;
