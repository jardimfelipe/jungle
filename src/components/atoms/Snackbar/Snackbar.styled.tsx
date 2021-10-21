import styled, { keyframes } from 'styled-components';

const fadein = keyframes`
    from {
      bottom: 0;
      opacity: 0;
    }
    to {
      bottom: 1rem;
      opacity: 1;
    }
`;

const fadeout = keyframes`
    from {
      bottom: 1rem;
      opacity: 1;
    }
    to {
      bottom: 0;
      opacity: 0;
    }
`;

export const SnackbarContainer = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  height: auto;
  padding: 0.625rem 1rem;
  border-radius: 0.75rem;
  border: transparent;
  background-color: ${(props) => props.theme.colors.p1};
  color: #ffffff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${fadein} 0.5s, ${fadeout} 0.5s 3.9s;
`;
