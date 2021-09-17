import { CSSProperties } from "react";

type TextLevel = 1 | 2 | 3 | 4 | 5;
type TextDecoration = "underline" | "delete" | "strong" | null;
type VariantTypes = "primary" | "default"
type TextAlignments = "start" | "center" | "end" | "justify"

export interface TypographyTypes {
  disabled?: boolean;
  ellipsis?: boolean;
  textDecoration?: TextDecoration;
  className?: string;
  variant?: VariantTypes;
  style?: CSSProperties;
  size?: number;
  textAlign?: TextAlignments
}

export interface TitleProps extends TypographyTypes {
  level?: TextLevel;
  color?: string;
}

export interface TextProps extends TypographyTypes {
  paragraph?: boolean;
  color?: string;
  onClick?: () => void;
}
