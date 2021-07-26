import { ReactNode } from 'react';

export interface CardProps {
  background?: string;
  children?: ReactNode;
  hasCloseButton?: boolean;
  size?: 'small' | 'regular';
}

export interface CardContainerProps
  extends Omit<CardProps, 'children' | 'hasCloseButton'> {}
