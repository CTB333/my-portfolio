import React from "react";
import { BaseShapeProps } from "./types";
import { PIXELS } from "./ratio";
import { BaseLengthProps } from "../common_animations/types";

import "../../css/Triangle.css";
import { SVGS } from "../../assets";

const ROTATIONS = {
  up: SVGS.EqualUp,
  down: SVGS.EqualDown,
  left: SVGS.EqualLeft,
  right: SVGS.EqualRight,

  rightAngleTopLeft: SVGS.RightAngleTopLeft,
  rightAngleTopRight: SVGS.RightAngleTopRight,

  rightAngleBottomLeft: SVGS.RightAngleBottomLeft,
  rightAngleBottomRight: SVGS.RightAngleBottomRight,

  rightAngleDoubleLeft: SVGS.DoubleRightAngleLeft,
  rightAngleDoubleRight: SVGS.DoubleRightAngleRight,
};

export type TriangleProps = BaseShapeProps &
  BaseLengthProps & {
    rotation?: keyof typeof ROTATIONS;
  };

export const Triangle = ({
  children,
  className,
  color,
  rotation = "up",
  size = 1,
  base = 1,
  length = 1,
  styles = {},
}: TriangleProps) => {
  const width = PIXELS * size * base;
  const height = PIXELS * size * length;

  return (
    <div
      className={className}
      style={{
        width,
        height,
        backgroundColor: color,
        position: "relative",

        // fill: "#000",
        // clipPath: `url(${ROTATIONS[rotation]})`,
        // clipRule: "evenodd",

        maskImage: `url(${ROTATIONS[rotation]})`,
        maskRepeat: "no-repeat",
        maskSize: "89%",
        maskPosition: "center",

        pointerEvents: "visiblePainted",

        ...styles,
      }}
    >
      {children}
    </div>
  );
};
