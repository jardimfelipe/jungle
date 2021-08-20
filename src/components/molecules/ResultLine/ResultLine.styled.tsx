import styled from 'styled-components';
import media from 'styled-media-query';
import { StyledButton } from '../../atoms/Button/Button.styled';

export const LineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 60px;
  align-items: center;
  position: relative;
  text-transform: capitalize;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10%;
    width: 40%;
    border-bottom: 3px dashed #4ed9a7;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10%;
    width: 40%;
    border-bottom: 3px dashed ${(props) => props.theme.colors.blue};
  }
  ${media.lessThan('medium')`
    padding: 0 0px;
  `}
`;

export const ChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    .chart {
      order: 1;
    }
    .left-text {
      order: 2;
    }
    .right-text {
      order: 3;
    }
  }
`;

export const TextContainer = styled.div`
  flex: 0 0 10%;
`;

export const ArrowBox = styled.div`
  display: flex;
  align-items: center;
`;

export const CenterDot = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  text-align: center;
  width: 350px;
`;

export const YouAreHereContainer = styled.div<{ position: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  position: absolute;
  top: calc(50% + 10px);
  left: ${({ position }) => position};
  transform: translate(-50%, -50%);
  z-index: 2;
  color: ${(props) => props.theme.colors.blue};
  min-width: 200px;
  @media (max-width: 768px) {
    top: 16px;
  }
`;

export const SpecialistButton = styled(StyledButton)`
  color: ${(props) => props.theme.colors.black};
  font-size: 14px;
  width: 200px;
  padding: 0;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }
`;
