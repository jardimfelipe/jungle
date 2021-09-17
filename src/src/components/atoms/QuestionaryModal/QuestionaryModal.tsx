import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import { useTranslation } from 'react-i18next';

import { Box, Modal, Typography, Image } from '../..';
import QuestionayImage from '../../../assets/questionary-modal.png';
import useMobileWidth from '../../../hooks/useMobileWidth';
import { ModalButton } from '../../pages/Dashboard/Dashboard.styled';

import { QuestionaryModalProps } from './QuestionaryModal.types';

const { Title } = Typography;

const QuestionaryModal: React.FC<QuestionaryModalProps> = ({
  onClick,
  onClose,
  isModalOpen,
  questionaryTitle,
}) => {
  const isMobile = useMobileWidth();
  const { t } = useTranslation();
  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <Row>
        <Col xs={12} lg={8}>
          <Box
            params={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '25px 32px',
            }}
          >
            <Title variant="primary" level={2}>
              Questionário {questionaryTitle}
            </Title>
          </Box>
        </Col>
        {!isMobile && (
          <Col xs>
            <Box
              params={{
                padding: '25px 32px',
              }}
            >
              <Image src={QuestionayImage} />
            </Box>
          </Col>
        )}
        <ModalButton onClick={onClick} variant="primary" block>
          {t('startQuestionarie')}
        </ModalButton>
      </Row>
    </Modal>
  );
};

export default QuestionaryModal;
