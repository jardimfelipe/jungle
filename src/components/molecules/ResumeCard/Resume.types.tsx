import { ReactNode } from 'react';

export type ResumeProps = {
  name: string;
  total: number;
  icon: ReactNode;
  onClick: () => void;
};
