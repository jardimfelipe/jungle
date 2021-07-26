import React from 'react';

import { useTheme } from 'styled-components';

import { Box, Button, Typography, Image } from '../..';
import Specialist from '../../../assets/specialist.svg';
import { SpecialistCard } from './Sidebar.styled';

const { Title } = Typography;

const SpecialistBanner: React.FC = () => {
  const theme = useTheme();
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
        <Button variant="primary" size="small">
          Falar com especialista
        </Button>
      </SpecialistCard>
    </Box>
  );
};

export default SpecialistBanner;
