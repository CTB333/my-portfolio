import { CSSProperties } from "react";

export type BaseShapeProps = {
  size?: number;
  color?: string;
  children?: React.ReactNode;
  className?: string;
  styles?: CSSProperties;
};
