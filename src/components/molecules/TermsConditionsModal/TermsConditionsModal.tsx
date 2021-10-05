import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { saveState, getSavedState } from '../../../utils/localStorage';

import { Box, Modal, Typography, Checkbox, Button } from '../..';

const { Text, Title } = Typography;

const TermsConditionsModal: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [opcao, setOpcao] = useState(false);
  const { currentUser } = useSelector(({ login }: RootState) => login);
  const [isModalOpen, setIsModalOpen] = useState(
    getSavedState('modal' + currentUser['_id'])
  );
  const handleModalClose = () => {
    setIsModalOpen(false);
    saveState('modal' + currentUser['_id'], false);
  };

  useEffect(() => {
    if (getSavedState('modal' + currentUser['_id']) == null) {
      saveState('modal' + currentUser['_id'], true);
      console.log('Abrir? ' + getSavedState('modal' + currentUser['_id']));
    } else {
      console.log('Abrir? ' + getSavedState('modal' + currentUser['_id']));
    }
  });

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
            maxHeight: '230px',
          }}
        >
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.introduction.0'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.introduction.1'
          )}`}</Text>

          <Text textDecoration="strong" paragraph>
            {t('termsConditions.introduction.2')}
          </Text>

          <Title level={3}>{t('termsConditions.purpose.title')}</Title>

          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose.text.0'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose.text.1'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose.text.2'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose.text.3'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose.text.4'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose.text.5'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose.text.6'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose.text.7'
          )}`}</Text>

          <Title level={3}>{t('termsConditions.purpose2.title')}</Title>

          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose2.text.0'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose2.text.1'
          )}`}</Text>

          <Title level={3}>{t('termsConditions.purpose3.title')}</Title>

          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose3.text.0'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose3.text.1'
          )}`}</Text>

          <Title level={3}>{`${t('termsConditions.purpose4.title')}`}</Title>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose4.text.0'
          )}`}</Text>

          <Title level={3}>{`${t('termsConditions.purpose5.title')}`}</Title>

          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose5.text.0'
          )}`}</Text>

          <Title level={3}>{`${t('termsConditions.purpose6.title')}`}</Title>

          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose6.text.0'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose6.text.1'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose6.text.2'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose6.text.3'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose6.text.4'
          )}`}</Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.purpose6.text.5'
          )}`}</Text>

          <Text paragraph textAlign="justify">
            {`${t('termsConditions.end.text.0')}`}
            <Text textDecoration="strong">{`${t(
              'termsConditions.end.text.1'
            )}`}</Text>
            {`${t('termsConditions.end.text.2')}`}
          </Text>
          <Text paragraph textAlign="justify">{`${t(
            'termsConditions.end.text.3'
          )}`}</Text>
        </Box>
        <Box
          params={{
            paddingTop: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Checkbox
            label={`${t('termsConditions.cb_terms1')}`}
            checked={opcao}
            onChange={() => {
              setOpcao(!opcao);
            }}
          ></Checkbox>
          <Box params={{ flex: '0 0 40%' }}>
            <Button
              variant="primary"
              block
              disabled={!opcao}
              onClick={handleModalClose}
            >
              {`${t('termsConditions.end.button')}`}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsConditionsModal;
