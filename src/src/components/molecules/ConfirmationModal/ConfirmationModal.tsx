import React from 'react';

import { Modal, Typography, Box, Button } from '../../';
import { ConfirmationModalProps } from './ConfirmationModa.types';

const { Title } = Typography;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onFeedbackClick,
}) => {
  return (
    <Modal height={350} width={650} isOpen={isOpen} onClose={onClose}>
      <Box
        params={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          position: 'relative',
        }}
      >
        <Title textAlign="center" variant="primary">
          Deseja deletar esse item?
        </Title>
        <Box params={{ display: 'flex' }}>
          <Button
            onClick={() => onFeedbackClick(true)}
            flat
            variant="primary"
            block
          >
            Sim
          </Button>
          <Button
            onClick={() => onFeedbackClick(false)}
            flat
            variant="secondary"
            block
          >
            Não
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
