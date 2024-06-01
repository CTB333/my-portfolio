import React from "react";
import { COLORS } from "../../constants";
import { BaseShapeProps } from "./types";
import { PIXELS } from "./ratio";
import { BaseLengthProps } from "../common_animations/types";

type RectangleProps = BaseShapeProps & BaseLengthProps & {};

export const Rectangle = ({
  base = 1,
  length = 1,
  size = 1,
  color = COLORS.gray,
  className = "",
  children,
  styles = {},
}: RectangleProps) => {
  return (
    <div
      style={{
        width: PIXELS * base * size,
        height: PIXELS * length * size,
        backgroundColor: color,
        ...styles,
      }}
      className={"rad-20 ov-hidden " + className}
    >
      {children}
    </div>
  );
};
