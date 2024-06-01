import React from "react";
import { BaseShapeProps } from "./types";
import { PIXELS } from "./ratio";

type CircleProps = BaseShapeProps & {};

export const Circle = ({
  size = 1,
  children,
  color,
  className,
  styles = {},
}: CircleProps) => {
  return (
    <div
      style={{
        width: PIXELS * size,
        height: PIXELS * size,
        borderRadius: PIXELS * size,
        backgroundColor: color,

        ...styles,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
