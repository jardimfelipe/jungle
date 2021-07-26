import styled, { css } from 'styled-components';
import { InputWrapperProps, StyledInputProps } from './Textfield.types';

const disabledStyles = css`
  background-color: ${(props) => props.theme.colors.darkGray};
  cursor: not-allowed;
  &::placeholder {
    color: ${(props) => props.theme.colors.black};
    font-weight: 400;
  }
`;

const inlineStyles = css`
  flex-direction: row;
  align-items: center;
`;

const prefixStyles = css`
  padding-left: 45px;
`;

const suffixStyles = css`
  padding-right: 45px;
`;

const adornmentStyles = css`
  position: absolute;
  bottom: 12px;
  svg {
    width: 28px;
    height: 28px;
    color: ${(props) => props.theme.colors.darkGray};
  }
`;

export const StyledInput = styled.input.attrs((props) => ({
  type: props.type,
}))<StyledInputProps>`
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.gray};
  border: 1px solid ${(props) => props.theme.colors.gray};
  height: 40px;
  border-radius: 10px;
  padding: 28px 16px;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  ${(props) => props.hasPrefix && prefixStyles};
  ${(props) => props.hasSuffix && suffixStyles};
  ${({ disabled }) => disabled && disabledStyles};
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  position: relative;
  ${(props) => props.inline && inlineStyles};
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

export const PrefixWrapper = styled.div`
  ${adornmentStyles}
  left: 8px;
`;

export const SuffixWrapper = styled.div`
  ${adornmentStyles}
  right: 8px;
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  position: absolute;
  bottom: -20px;
`;
