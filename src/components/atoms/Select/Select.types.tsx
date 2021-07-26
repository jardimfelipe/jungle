export type OptionType = { [value: string]: any };
export type SelectProps = {
  clearValue?: () => void;
  options: OptionType[];
  selectOption?: (value: OptionType) => void;
  selectProps?: any;
  placeholder?: string;
};
