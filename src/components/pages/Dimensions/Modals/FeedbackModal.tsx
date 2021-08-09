import React, { useEffect, useState } from 'react';

import { Modal, Typography, Image, Box } from '../../..';
import { Col, Row } from 'react-flexbox-grid';
import { ModalButton } from '../../Dashboard/Dashboard.styled';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { resetDimensionFeedback } from '../../../../store/modules/dimensions/actions';

import SuccessFeedback from '../../../../assets/SuccessFeedback.svg';

const { Title } = Typography;

const FeedbackModal: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const { feedback } = useSelector(({ dimensions }: RootState) => dimensions);

  const handleModalClose = () => {
    setisModalOpen(false);
    dispatch(resetDimensionFeedback());
  };
  useEffect(() => {
    if (feedback.status !== '') setisModalOpen(true);
  }, [feedback]);
  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <Box params={{ padding: '25px 35px' }}>
        <Row middle="xs" around="xs">
          <Col xs={12} md={4}>
            <Title level={1}>{feedback.message}</Title>
          </Col>
          <Col xs={12} md={4}>
            <Image src={SuccessFeedback} />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <ModalButton variant="primary" onClick={handleModalClose}>
              Fechar
            </ModalButton>
          </Col>
        </Row>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
