import React from "react";
import { Icon } from "./Icon";
import { COLORS } from "../constants";

import { useScreenSize } from "../providers";

type StarRowProps = {
  filled?: number;
};
const STARS = [0, 0, 0, 0, 0];

export const StarRow = ({ filled = 0 }: StarRowProps) => {
  const { ltMedium, ltSmall } = useScreenSize();
  return (
    <div className={`flex row ${ltMedium ? "mt-25" : ""}`}>
      {STARS.map((_value, index) => {
        const value = filled - index;
        const isFilled = value > 0;
        const isHalf = value === 0.5;

        return (
          <div key={index} className={`${ltMedium ? "mr-15" : "mh-15"} star`}>
            <Icon
              name={
                isHalf ? "starHalf" : isFilled ? "starFilled" : "starOutline"
              }
              size={ltSmall ? 1 : 1.5}
              color={isFilled || isHalf ? COLORS.accent : COLORS.secondary}
            />
          </div>
        );
      })}
    </div>
  );
};
