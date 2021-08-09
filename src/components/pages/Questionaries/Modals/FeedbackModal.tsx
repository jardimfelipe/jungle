import React, { useEffect, useState } from 'react';

import { Modal, Typography, Image, Box, Tag } from '../../..';
import { Col, Row } from 'react-flexbox-grid';
import { ModalButton } from '../../Dashboard/Dashboard.styled';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { resetFeeback } from '../../../../store/modules/questionaries/actions';

import SuccessFeedback from '../../../../assets/SuccessFeedback.svg';
import { RouteState } from '../CreateQuestionary.page';
import { useHistory, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const FeedbackModal: React.FC = () => {
  const dispatch = useDispatch();
  const {
    state: { questionary },
  } = useLocation<RouteState>();
  const history = useHistory();
  const [isModalOpen, setisModalOpen] = useState(false);
  const { feedback } = useSelector(
    ({ questionaries }: RootState) => questionaries
  );

  const handleModalClose = () => {
    setisModalOpen(false);
    dispatch(resetFeeback());
    history.push('/questionaries');
  };
  useEffect(() => {
    if (feedback.status !== '') setisModalOpen(true);
  }, [feedback]);
  return (
    <Modal isOpen={isModalOpen} onClose={handleModalClose}>
      <Box params={{ padding: '0px' }}>
        <Row middle="xs" around="xs">
          <Col xs={12} md={4}>
            <Box
              params={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
            >
              <Title level={1}>{feedback.message}</Title>
              <Box params={{ display: 'block' }}>
                <Tag color="primary" size="large">
                  {questionary.dimension.name}
                </Tag>
              </Box>
              <Text size={28} textDecoration="strong" variant="primary">
                {questionary.title}
              </Text>
              <Text>
                {questionary.dimension.qt_minimum} a{' '}
                {questionary.dimension.qt_maximum} perguntas
              </Text>
            </Box>
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
