import React from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { Card, Typography, Image } from '../..';
import { CardImage, CardTitle } from './PromotionalCard.styled';
import TableImage from '../../../assets/dashboard-card.png';
import useMobileWidth from '../../../hooks/useMobileWidth';

const { Text } = Typography;

export type PromotionalCardProps = {
  title?: string;
  text?: string;
};

const PromotionalCard: React.FC<PromotionalCardProps> = ({
  title = '',
  text = '',
}) => {
  const isMobile = useMobileWidth();
  return (
    <Card hasCloseButton background="#E5EEF7">
      {!isMobile ? (
        <Row>
          <Col xs={12} sm={7} lg={9} xl={10}>
            <CardTitle variant="primary" level={2}>
              {title || 'Lorem ipsum dolor sit amet'}
            </CardTitle>
            <Text>
              {text ||
                'Sed in libero commodo enim laoreet auctor. Donec ac ultricies nibh, non gravida nibh. Orci varius natoque penatibus et magnis'}
            </Text>
          </Col>
          <CardImage xs>
            <Image src={TableImage} alt="Lorem Ipsum" />
          </CardImage>
        </Row>
      ) : (
        <Row>
          <Col xs={12}>
            <CardTitle variant="primary" level={2}>
              Lorem ipsum dolor sit
            </CardTitle>
          </Col>
          <Col xs={7}>
            <Text>
              Sed in libero commodo enim laoreet auctor. Donec ac ultricies
              nibh, non gravida nibh. Orci varius natoque penatibus et magnis
            </Text>
          </Col>
          <CardImage xs>
            <Image src={TableImage} alt="Lorem Ipsum" />
          </CardImage>
        </Row>
      )}
    </Card>
  );
};

export default PromotionalCard;
