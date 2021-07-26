import React, { useEffect } from 'react';

import {
  Box,
  Card,
  PromotionalCard,
  ProtectionLevel,
  Typography,
  ResultLine,
} from '../..';
import {
  ResultCard,
  CardHeader,
  CardBody,
  StyledCol,
} from './MyResults.styled';
import { Col, Row } from 'react-flexbox-grid';
import { Icons } from '../../';

import { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getDimensionsRequest } from '../../../store/modules/dimensions/actions';

const { Brain } = Icons;

const { Title, Text } = Typography;

const MyResults: React.FC = () => {
  const { dimensions } = useSelector((state: RootState) => state.dimensions);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getDimensionsRequest());
  }, [dispatch]);
  return (
    <Box params={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <PromotionalCard />

      <Title level={3}>Meus resultados</Title>

      <Row>
        <Col xs={12} xl={8}>
          <Box
            params={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
          >
            {dimensions.map(({ name }) => (
              <ResultCard key={`dimension-${name}`}>
                <CardHeader>
                  <Text textDecoration="strong" variant="primary">
                    <Brain color={theme.colors.blue} />
                    {name}
                  </Text>
                  <Text textDecoration="strong" variant="primary">
                    65%
                  </Text>
                </CardHeader>
                <CardBody>
                  <ResultLine
                    results={{
                      analise:
                        'Observamos níveis de proteção contra ocorrências de sintomas ansiosos, maiores do que a população geral. Os sintomas podem ser reativos a problemas diversos, e não necessariamente se traduzem em transtornos.',
                      total: 65,
                    }}
                    hasAnalysis
                    type={name}
                  />
                </CardBody>
              </ResultCard>
            ))}
          </Box>
        </Col>
        <StyledCol xs>
          <Card>
            <ProtectionLevel />
          </Card>
        </StyledCol>
      </Row>
    </Box>
  );
};

export default MyResults;
