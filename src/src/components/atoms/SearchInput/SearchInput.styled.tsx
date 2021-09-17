import styled from 'styled-components';

export const StyledInput = styled.input`
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.darkGray};
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 55px 10px 15px;
  height: 45px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  svg {
    position: absolute;
    right: 15px;
    top: 5px;
  }
`;
