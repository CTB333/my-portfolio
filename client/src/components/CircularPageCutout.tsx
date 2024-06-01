import React from "react";
import { Circle } from "./shapes";
import { COLORS } from "../constants";
import { useScreenSize } from "../providers";

type CircularPageCutoutProps = {
  inverted?: boolean;
};

export const CircularPageCutout = ({
  inverted = false,
}: CircularPageCutoutProps) => {
  const { ltSmall } = useScreenSize();

  return (
    <div className="flex center relative pv-10">
      <Circle
        size={ltSmall ? 2 : 4}
        color={inverted ? COLORS.secondary : COLORS.primary}
        className="z-2"
      />

      <div className="absolute-fill z-1 flex column width">
        <div
          style={{
            backgroundColor: COLORS.primary,
          }}
          className="width flex-1"
        ></div>
        <div
          style={{
            backgroundColor: COLORS.secondary,
          }}
          className="width flex-1"
        ></div>
      </div>
    </div>
  );
};
