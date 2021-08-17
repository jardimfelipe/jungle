import React from 'react';
import { useSelector } from 'react-redux';

import { useTheme } from 'styled-components';

import { Box, Typography, Image } from '../..';
import Specialist from '../../../assets/specialist.svg';
import { RootState } from '../../../store';
import { SpecialistCard, SpeclialistLink } from './Sidebar.styled';

const { Title } = Typography;

const SpecialistBanner: React.FC = () => {
  const theme = useTheme();
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
          <Title level={3}>Estamos aqui para te ajudar.</Title>
        </Box>
        <SpeclialistLink
          target="_blank"
          href={
            currentUser.role === 'user'
              ? 'mailto:medical@junglexp.com.br'
              : 'https://calendly.com/medical-jungle/15min?month=2021-08'
          }
        >
          Falar com especialista
        </SpeclialistLink>
      </SpecialistCard>
    </Box>
  );
};

export default SpecialistBanner;
