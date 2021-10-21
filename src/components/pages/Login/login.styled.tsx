import styled from 'styled-components';

export const LoginContainer = styled.div`
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

export const AdminAccessContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 32px 0;
  text-align: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.gray};
  a {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.black};
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
