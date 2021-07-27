import React from 'react';

import { Box, Modal, Typography, FileUploader } from '../../..';
import { ModalButton } from '../../../pages/Dashboard/Dashboard.styled';

const { Title } = Typography;

type ModalProps = {
  onClick: () => void;
  onClose: () => void;
  isModalOpen: boolean;
};

const CreateUser: React.FC<ModalProps> = ({
  onClick,
  onClose,
  isModalOpen,
}) => {
  const handleFileUpload = (files: File[]) => {
    if (!files.length) return;
    const data = new FormData();
    data.append('file', files[0], files[0].name);
  };
  return (
    <Modal width={550} height={500} isOpen={isModalOpen} onClose={onClose}>
      <Box
        params={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '25px 32px',
        }}
      >
        <Title style={{ alignSelf: 'flex-start' }} variant="primary" level={4}>
          Cadastrar usuários
        </Title>
        <ModalButton onClick={onClick} variant="primary" block>
          Enviar planilha
        </ModalButton>

        <FileUploader onDrop={handleFileUpload} />
      </Box>
    </Modal>
  );
};

export default CreateUser;
