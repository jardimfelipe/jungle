import React from 'react';

import { Typography } from './typography.styled';

import { TitleProps } from './typography.types';

export const Title: React.FC<TitleProps> = (props) => {
  const { level = 1, ...otherProps } = props;
  const TitleTag = `h${level}` as unknown as React.FC<
    Omit<TitleProps, 'level'>
  >;

  return (
    <Typography as={TitleTag} {...otherProps}>
      {props.children}
    </Typography>
  );
};
