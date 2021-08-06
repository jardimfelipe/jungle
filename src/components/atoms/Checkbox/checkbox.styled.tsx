import styled from 'styled-components';

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  label {
    user-select: none;
    cursor: pointer;
  }
`;

export const StyledCheckbox = styled.div`
  input {
    position: relative;
    cursor: pointer;
    margin: 4px 5px 0;
    -webkit-appearance: none;
    appearance: none;
    outline: none;

    &::before {
      content: '';
      display: block;
      position: initial;
      width: 24px;
      height: 24px;
      top: 0;
      left: 0;
      border: 1px solid ${(props) => props.theme.colors.gray};
      border-radius: 5px;
      background-color: ${(props) => props.theme.colors.gray};
    }

    &:checked {
      &::before {
        content: '';
        display: block;
        position: initial;
        width: 16px;
        height: 16px;
        top: 0;
        left: 0;
        border: 12px solid ${(props) => props.theme.colors.blue};
        border-radius: 4px;
        background-color: ${(props) => props.theme.colors.blue};
      }
    }
  }
`;
