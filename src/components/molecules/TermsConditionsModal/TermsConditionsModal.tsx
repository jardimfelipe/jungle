import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { Box, Modal, Typography } from '../..';

const { Text, Title } = Typography;

const TermsConditionsModal: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  console.log(t('termsConditions.introduction'));

  return (
    <Modal
      hasCloseButton={false}
      isOpen={isModalOpen}
      onClose={handleModalClose}
    >
      <Box params={{ display: 'flex', flexDirection: 'column' }}>
        <Box
          params={{
            padding: '20px 25px',
            backgroundColor: theme.colors.blue,
            textAlign: 'center',
          }}
        >
          <Text color="#ffffff" textDecoration="strong">
            {t('termsConditions.header')}
          </Text>
        </Box>

        <Box
          params={{
            padding: '15px 25px',
            backgroundColor: theme.colors.gray,
            overflowY: 'auto',
            maxHeight: '300px',
          }}
        >
          <Text paragraph>{`${t('termsConditions.introduction.0')} ${t(
            'termsConditions.introduction.1'
          )}`}</Text>

          <Text textDecoration="strong" paragraph>
            {t('termsConditions.introduction.2')}
          </Text>

          <Title level={3}>{t('termsConditions.purpose.title')}</Title>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsConditionsModal;
