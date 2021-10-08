import React, { useEffect, useState } from 'react';

import { Modal, Typography, Image, Box } from '../../..';
import { Col, Row } from 'react-flexbox-grid';
import { ModalButtonHalf } from '../../Questionaries/Modals/CreateQuestion.styled';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { resetQuestionFeedback } from '../../../../store/modules/questions/actions';

import SuccessFeedback from '../../../../assets/SuccessFeedback.svg';

const { Title } = Typography;

const FeedbackModal: React.FC<{ isEditingQuestion: boolean }> = ({
  isEditingQuestion,
}) => {
  const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const { feedback } = useSelector(({ questions }: RootState) => questions);

  const handleModalClose = () => {
    setisModalOpen(false);
    dispatch(resetQuestionFeedback());
  };
  useEffect(() => {
    if (feedback.status !== '') setisModalOpen(true);
  }, [feedback]);
  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <Box params={{ padding: '25px 35px' }}>
        <Row middle="xs" around="xs">
          <Col xs={12} md={4}>
            <Title level={1}>
              {isEditingQuestion
                ? 'Pergunta editada com sucesso'
                : 'Pergunta cadastrada com sucesso!'}
            </Title>
          </Col>
          <Col xs={12} md={4}>
            <Image src={SuccessFeedback} />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <ModalButtonHalf variant="secondary" onClick={handleModalClose}>
              Fechar
            </ModalButtonHalf>
            <ModalButtonHalf
              variant="primary"
              style={{ right: 0, left: 'auto' }}
              onClick={handleModalClose}
            >
              {isEditingQuestion ? 'Editar' : 'Cadastrar'} outra pergunta
            </ModalButtonHalf>
          </Col>
        </Row>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
