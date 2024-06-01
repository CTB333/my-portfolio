import { ReactNode } from "react";

export type ButtonContainerProps = {
  onPress?: () => void;
  children?: ReactNode;
  color?: string;
  disabled?: boolean;
  className?: string;
};

export const BaseButtonClass = "flex center rad-20 p-20 ";
