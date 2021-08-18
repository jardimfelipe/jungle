import { Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import media from 'styled-media-query';
import { CardContainer } from '../../atoms/Card/Card.styled';

export const SocialAspectsCard = styled(CardContainer)`
  padding: 0;
`;

export const CardHeader = styled.div`
  background-color: #d0dffc;
  padding: 15px 20px;
  border-radius: 8px 8px 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  span {
    display: flex;
    align-items: center;
    gap: 15px;
  }
`;

export const CardBody = styled.div`
  background-color: #ffffff;
  padding: 25px 20px 15px 20px;
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 8px 8px;
`;

export const StyledCol = styled(Col)`
  @media (max-width: 1210px) {
    margin-top: 15px;
  }
`;

export const ResultsCard = styled(CardContainer)`
  flex: 0 0 40%;
  ${media.lessThan('medium')`
    flex: 0 0 100%;
  `}
`;
