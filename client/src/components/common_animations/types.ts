import { CSSProperties } from "react";

export type BaseAnimationProps = {
  className?: string;
  children?: React.ReactNode;
  to?: number;
  duration?: number;
  stayActive?: boolean;
  clickable?: boolean;
  style?: CSSProperties;
  onPress?: () => void;
  disabled?: boolean;
};

export type BaseLengthProps = {
  base?: number;
  length?: number;
};
