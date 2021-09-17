import React from 'react';

import { Typography } from './typography.styled';

import { TextProps } from './typography.types';

export const Text: React.FC<TextProps> = (props) => {
  const { paragraph = false, ...otherProps } = props;
  const TextTag = `${
    paragraph ? 'p' : 'span'
  }` as unknown as React.FC<TextProps>;

  return (
    <Typography as={TextTag} {...otherProps}>
      {props.children}
    </Typography>
  );
};
