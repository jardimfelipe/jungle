import { Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import media from 'styled-media-query';
import { CardContainer } from '../../atoms/Card/Card.styled';
import { LineContainer } from '../../molecules/ResultLine/ResultLine.styled';
import { SocialAspectsCard } from '../MyResults/MyResults.styled';

export const CardImage = styled.div<{ side: 'left' | 'right' }>`
  position: absolute;
  bottom: 0;
  ${(props) => (props.side === 'left' ? 'left: 25px' : 'right: 25px')};
  @media (max-width: 1080px) {
    display: none;
  }
`;

export const ChartsContainer = styled.div`
  display: flex;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  ${SocialAspectsCard}, ${CardContainer} {
    flex: 0 0 calc(50% - 7.5px);
    ${media.lessThan('large')`
      flex: 0 0 100%;
    `}
  }
`;

export const StyledCol = styled(Col)`
  ${CardContainer} {
    height: 100%;
  }
  ${media.lessThan('large')`
      margin-top: 15px;
  `}
`;

export const CharFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
  flex: 0 0 50%;
  align-items: center;
  ${media.lessThan('large')`
    flex: 0 0 100%;
    justify-content:center;
  `}
`;

export const LevelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 100%;
  flex: 0 0 50%;
  ${media.lessThan('large')`
    flex: 0 0 100%;
  `}
`;

export const ChartsBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  ${media.lessThan('large')`
  `}
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardCharts = styled.div<{ align?: 'center' | 'space-between' }>`
  display: flex;
  justify-content: ${({ align = 'space-between' }) => align};
  flex: 0 0 45%;
  flex-wrap: wrap;
  .chart {
    padding: 0 20px;
  }
  ${media.lessThan('large')`
    flex: auto;
  `}
`;

export const CardIcon = styled.div`
  padding: 10px 13px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.gray};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardBody = styled.div`
  background-color: #ffffff;
  padding: 25px 20px 15px 20px;
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 8px 8px;
  ${LineContainer} {
    padding: 0 20px;
    ${media.lessThan('medium')`
    padding: 0;
  `}
  }
`;
