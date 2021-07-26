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
import { BiHeart } from 'react-icons/bi';
import { FiBox } from 'react-icons/fi';
import { Icons } from '../../';

import { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { getResultsRequest } from '../../../store/modules/results/actions';

const { Brain, Communication } = Icons;

const { Title, Text } = Typography;

const MyResults: React.FC = () => {
  const { results } = useSelector((state: RootState) => state.results);
  const dispatch = useDispatch();
  const theme = useTheme();
  const resultsIcons = {
    neuroticidade: <Brain color={theme.colors.blue} />,
    amabilidade: <BiHeart color={theme.colors.blue} />,
    abertura: <FiBox color={theme.colors.blue} />,
    contato: <Communication color={theme.colors.blue} />,
  };

  useEffect(() => {
    dispatch(getResultsRequest());
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
            {Object.keys(results).map((props, index) => (
              <ResultCard>
                <CardHeader>
                  <Text textDecoration="strong" variant="primary">
                    {resultsIcons[props as keyof typeof resultsIcons]}
                    {props}
                  </Text>
                  <Text textDecoration="strong" variant="primary">
                    {results[props as keyof typeof results].total}%
                  </Text>
                </CardHeader>
                <CardBody>
                  <ResultLine
                    results={results[props as keyof typeof results]}
                    type={props}
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
