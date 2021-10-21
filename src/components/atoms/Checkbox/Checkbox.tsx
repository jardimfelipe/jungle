import React from 'react';
import { ICheckboxProps } from './checkbox.types';
import { FlexWrapper, StyledCheckbox } from './checkbox.styled';

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { disabled = false, checked, id = 'checkbox', ...rest } = props;

  return (
    <FlexWrapper>
      <StyledCheckbox checked={checked}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          data-testid="checkbox-component"
          id={id}
          {...rest}
        />
      </StyledCheckbox>
      <label htmlFor={id} data-testid="checkbox-label">
        {props.label}
      </label>
    </FlexWrapper>
  );
};

export default Checkbox;
