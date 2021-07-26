import { InputHTMLAttributes, ReactNode } from 'react';

type Status = 'success' | 'error';

type Feedback = {
  status: Status;
  text?: string;
};

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  addonBefore?: ReactNode;
  allowClear?: boolean;
  disabled?: boolean;
  id?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  value?: string;
  label?: string;
  feedback?: Feedback;
  inline?: boolean;
  ariaLabel?: string;
  onPressEnter?: () => void;
  isSearch?: boolean;
  error?: string;
}

export type InputWrapperProps = TextFieldProps;

export type StyledInputProps = {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
  hasAddon?: boolean;
  feedback?: Status;
};
