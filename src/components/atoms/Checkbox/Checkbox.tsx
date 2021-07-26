import React from 'react';
import { ICheckboxProps } from './checkbox.types';
import { FlexWrapper, StyledCheckbox } from './checkbox.styled';

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const handleChange = () => {
    if (props.onChange && !props.disabled) {
      props.onChange();
    }
  };

  const { disabled = false, checked } = props;

  return (
    <FlexWrapper>
      <StyledCheckbox>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          data-testid="checkbox-component"
        />
      </StyledCheckbox>
      <label onClick={handleChange} data-testid="checkbox-label">
        {props.label}
      </label>
    </FlexWrapper>
  );
};

export default Checkbox;
