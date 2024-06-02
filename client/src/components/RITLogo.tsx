import React from "react";
import { Circle } from "./shapes";
import { COLORS } from "../constants";
import { IMAGES } from "../assets";
import { useScreenSize } from "../providers";

export const RITLogo = () => {
  const { ltMedSmall, ltSmall } = useScreenSize();
  return (
    <div
      style={{ paddingTop: ltMedSmall ? 25 : 75, paddingBottom: 75 }}
      className="relative "
    >
      <Circle size={ltSmall ? 3 : 5} className="hidden" />

      <div className="absolute-fill flex center column space">
        <p className="relative fs-1 bold color-secondary font-2">Education</p>
        <p className="relative z-2 fs-1 bold rit-text font-2">RIT</p>
      </div>

      <div className="absolute-fill flex center">
        <Circle
          className="ov-hidden flex center"
          size={ltSmall ? 3 : 5}
          color={COLORS.primary}
        >
          <img className="img-contain" src={IMAGES.IconRIT} alt="RIT" />
        </Circle>
      </div>
    </div>
  );
};
