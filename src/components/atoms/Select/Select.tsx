import React from 'react';

import Select, { components } from 'react-select';
import { BiCaretDown } from 'react-icons/bi';
import { useTheme } from 'styled-components';
import { SelectProps } from './Select.types';

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <BiCaretDown size="24" />
    </components.DropdownIndicator> 
  );
}; 

const ReactSelect: React.FC<SelectProps> = (props) => {
  const theme = useTheme();
  const themeStyles = {
    control: (styles: any) => ({
      ...styles,
      backgroundColor: theme.colors.gray,
      height: '55px',
      border: '1px solid #B8CAE8',
      borderRadius: '10px',
    }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: 'none',
    }),
  };
  return (
    <Select
      components={{ DropdownIndicator }}
      styles={themeStyles}
      {...props}
    />
  );
};

export default ReactSelect;
