import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  padding: 0 64px;
  display: flex;
  gap: 32px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 768px) {
    padding: 0 10px 120px 0;
    height: auto;
    margin-top: 50px;
  }
`;

export const LostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
