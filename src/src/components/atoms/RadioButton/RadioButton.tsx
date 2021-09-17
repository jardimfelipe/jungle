import React from 'react';

import { RadioWrapper, RadioControl } from './RadioButton.styled';
import { FaCheck } from 'react-icons/fa';
import { RadioButtonProps } from './RadioButton.types';
import { Label, Typography } from '../..';

const RadioButton: React.FC<RadioButtonProps> = ({
  name,
  label,
  value,
  id,
  checked,
}) => {
  return (
    <Label htmlFor={id}>
      <RadioWrapper checked={checked}>
        <input id={id} type="radio" name={name} value={value} />
        <RadioControl>
          <FaCheck color="#3BC8E3" />
        </RadioControl>
        <Typography.Text>{label}</Typography.Text>
      </RadioWrapper>
    </Label>
  );
};

export default RadioButton;
