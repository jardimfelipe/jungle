import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useTheme } from 'styled-components';

import { Box, Typography, Image } from '../..';
import Specialist from '../../../assets/specialist.svg';
import { RootState } from '../../../store';
import { SpecialistCard, SpeclialistLink } from './Sidebar.styled';

const { Title } = Typography;

const SpecialistBanner: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { currentUser } = useSelector(({ login }: RootState) => login);
  return (
    <Box
      params={{
        padding: '64px 28px',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <SpecialistCard background={theme.colors.gray}>
        <Image src={Specialist} />
        <Box params={{ textAlign: 'center' }}>
          <Title level={3}>{t('weAreHereToHelp')}</Title>
        </Box>
        <SpeclialistLink
          target="_blank"
          href={
            currentUser.role === 'user'
              ? 'mailto:medical@junglexp.com.br'
              : 'https://calendly.com/medical-jungle/15min?month=2021-08'
          }
        >
          {t('button.talkToEspecialist')}
        </SpeclialistLink>
      </SpecialistCard>
    </Box>
  );
};

export default SpecialistBanner;
