import React from 'react';

import { Col, Row } from 'react-flexbox-grid';
import { Image, Typography, Box } from '../../..';
import { CardImage } from '../../TeamResults/TeamResults.styled';
import { ResultsCard } from '../MyResults.styled';
import Skeleton from 'react-loading-skeleton';

import Woman from '../../../../assets/team-resume/woman.png';
import Man from '../../../../assets/team-resume/man.png';
import { useTheme } from 'styled-components';
import { ResultType } from '../../../../store/modules/results/types';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

type ResultCardProps = {
  analysis: ResultType['analysis'];
  isLoading: boolean;
};

const Cards: React.FC<ResultCardProps> = ({ analysis, isLoading }) => {
  const { t } = useTranslation();

  const renderSkeletons = () => (
    <>
      <Col xs={12} xl={6}>
        <Box params={{ display: 'block', flex: 'auto' }}>
          <Skeleton height={150} />
        </Box>
      </Col>
      <Col xs={12} xl={6}>
        <Box params={{ display: 'block', flex: 'auto' }}>
          <Skeleton height={150} />
        </Box>
      </Col>
    </>
  );
  const theme = useTheme();
  return (
    <Row>
      {isLoading ? (
        renderSkeletons()
      ) : (
        <Box
          params={{
            display: 'flex',
            gap: '15px',
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          <ResultsCard>
            <Row>
              <Col xs={12} xl={10}>
                <Title color={theme.colors.p3} variant="primary" level={4}>
                  {t('adequateProtection')}
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
                  {t('minorProtection')}
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
      )}
    </Row>
  );
};

export default Cards;
