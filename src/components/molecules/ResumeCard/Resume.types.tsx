import { ReactNode } from 'react';

export type ResumeProps = {
  name: string;
  total: number | string;
  icon: ReactNode;
  onClick?: () => void;
};
