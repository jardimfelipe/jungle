type ButtonVariants = "primary" | "secondary" | "link"
type ButtonSizes = "small" | "regular"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  disabled?: boolean;
  size?: ButtonSizes;
  block?: boolean;
  isLoading?: boolean;
}