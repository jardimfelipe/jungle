import React from 'react';
import { ICheckboxProps } from './checkbox.types';
import { FlexWrapper, StyledCheckbox } from './checkbox.styled';

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { disabled = false, checked, ...rest } = props;

  return (
    <FlexWrapper>
      <StyledCheckbox>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          data-testid="checkbox-component"
          {...rest}
        />
      </StyledCheckbox>
      <label data-testid="checkbox-label">{props.label}</label>
    </FlexWrapper>
  );
};

export default Checkbox;
