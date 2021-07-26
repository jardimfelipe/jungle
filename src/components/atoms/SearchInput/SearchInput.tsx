import React from 'react';

import { IconButton } from '../..';
import { FiSearch } from 'react-icons/fi';
import { InputWrapper, StyledInput } from './SearchInput.styled';

// import { Container } from './styles';

const SearchInput: React.FC = () => {
  return (
    <InputWrapper>
      <StyledInput />
      <IconButton icon={<FiSearch size="24" />} />
    </InputWrapper>
  );
};

export default SearchInput;
