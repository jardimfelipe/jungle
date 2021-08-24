import styled from 'styled-components';

export const ChartWrapper = styled.div<{ size?: number }>`
  width: ${(props) => props.size || 70}px;
  height: ${(props) => props.size || 70}px;
  display: flex;
  align-items: center;
  gap: 15px;
  position: relative;
  span {
    position: absolute;
    top: 56%;
    left: 52%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    /* color: #4ed9a7; */
  }
`;
