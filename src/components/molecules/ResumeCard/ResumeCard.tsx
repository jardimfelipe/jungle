import React from 'react';
import { useTheme } from 'styled-components';

import { Box, Button, Typography } from '../..';
import { ResumeIcon, ResumeInfo, ResumeTexts } from './ResumeCard.styled';
import { BsArrowRight } from 'react-icons/bs';

import useMobileWidth from '../../../hooks/useMobileWidth';
import { CardContainer } from '../../atoms/Card/Card.styled';
import { ResumeProps } from './Resume.types';

const { Text } = Typography;

const ResumeCard: React.FC<ResumeProps> = ({ name, total, icon, onClick }) => {
  const theme = useTheme();
  const isMobile = useMobileWidth();
  return (
    <CardContainer background={theme.colors.blue}>
      <ResumeInfo>
        <Box
          params={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <ResumeIcon>{icon}</ResumeIcon>
          <ResumeTexts>
            <Text>{name}</Text>
            <Text textDecoration="strong">{total}%</Text>
          </ResumeTexts>
        </Box>
        {!isMobile && (
          <Button onClick={onClick}>
            <BsArrowRight size="20px" color="#ffffff" />
          </Button>
        )}
      </ResumeInfo>
    </CardContainer>
  );
};

export default ResumeCard;
