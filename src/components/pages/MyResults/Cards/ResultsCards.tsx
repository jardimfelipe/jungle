import React from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { Image, Typography, Box } from '../../..';
import { CardImage } from '../../TeamResults/TeamResults.styled';
import { ResultsCard } from '../MyResults.styled';

import Woman from '../../../../assets/team-resume/woman.png';
import Man from '../../../../assets/team-resume/man.png';
import { useTheme } from 'styled-components';
import { ResultType } from '../../../../store/modules/results/types';

const { Title } = Typography;

const Cards: React.FC<{ analysis: ResultType['analysis'] }> = ({
  analysis,
}) => {
  const theme = useTheme();
  return (
    <Row>
      <Box params={{ display: 'flex', gap: '15px', width: '100%' }}>
        <ResultsCard>
          <Row>
            <Col xs={12} xl={10}>
              <Title color={theme.colors.p3} variant="primary" level={4}>
                Proteção adequada contra
              </Title>
              <ul>
                {analysis.adequate_protection.map((protection, index) => (
                  <li key={`adequate-protection-${index}`}>{protection}</li>
                ))}
              </ul>
            </Col>
            <CardImage side="right">
              <Image src={Man} alt="Lorem Ipsum" />
            </CardImage>
          </Row>
        </ResultsCard>
        <ResultsCard>
          <Row>
            <Col
              xs
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-end',
                padding: 0,
              }}
            >
              <CardImage side="left">
                <Image src={Woman} alt="Lorem Ipsum" />
              </CardImage>
            </Col>
            <Col xs={12} xl={6}>
              <Title color={theme.colors.p1} variant="primary" level={4}>
                Proteção menor contra
              </Title>
              <ul>
                {analysis.minor_protection.map((protection, index) => (
                  <li key={`minor-protection-${index}`}>{protection}</li>
                ))}
              </ul>
            </Col>
          </Row>
        </ResultsCard>
      </Box>
    </Row>
  );
};

export default Cards;
