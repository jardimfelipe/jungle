import { InputHTMLAttributes } from 'react';

export interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked: boolean;
  disabled?: boolean;
}
