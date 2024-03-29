import React from 'react';

import {
  StyledInput,
  InputWrapper,
  Label,
  PrefixWrapper,
  SuffixWrapper,
  ErrorMessage,
} from './Textfield.styled';
import { TextFieldProps } from './Textfield.types';

const Textfield: React.FC<TextFieldProps> = ({
  placeholder,
  label,
  disabled,
  inline,
  ariaLabel,
  onChange,
  onBlur,
  value,
  id,
  name,
  type,
  prefix,
  suffix,
  error,
  isTransparent,
  noSpacing = false,
  onKeyDown,
}) => {
  return (
    <InputWrapper noSpacing={noSpacing} inline={inline}>
      {label && <Label>{label}</Label>}
      {prefix && <PrefixWrapper>{prefix}</PrefixWrapper>}
      <StyledInput
        hasPrefix={!!prefix}
        onKeyDown={onKeyDown}
        disabled={disabled}
        type={type}
        aria-label={ariaLabel}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        id={id}
        name={name}
        isTransparent={isTransparent}
      />
      {suffix && <SuffixWrapper>{suffix}</SuffixWrapper>}
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Textfield;
