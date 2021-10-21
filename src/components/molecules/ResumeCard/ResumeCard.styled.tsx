import styled from 'styled-components';

export const ResumeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: #ffffff;
  text-transform: capitalize;
  button {
    height: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
    display: block;
  }
`;

export const ResumeIcon = styled.div`
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 15px;
  flex-grow: 0;
  svg {
    width: 25px;
    height: 25px;
    color: #ffffff;
  }
`;

export const ResumeTexts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;
