import { ActionMeta } from 'react-select';

export type OptionType = { [value: string]: any };
export type SelectProps = {
  clearValue?: () => void;
  options: OptionType[];
  selectOption?: (value: OptionType) => void;
  onChange?: (
    value: OptionType | null,
    actionMeta: ActionMeta<OptionType>
  ) => void;
  selectProps?: any;
  placeholder?: string;
  
  value?: OptionType | null | undefined;
};
