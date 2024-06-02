import React from "react";
import { HoverGrow } from "./common_animations";
import { Rectangle } from "./shapes";
import { COLORS } from "../constants";

type AboutImageProps = {
  className?: string;
  base: number;
  length: number;
  src?: any;
};

export const AboutImage = ({
  base,
  length,
  className = "",
  src,
}: AboutImageProps) => {
  return (
    <HoverGrow className={`${className}`} stayActive clickable={false}>
      <Rectangle base={base} length={length} color={COLORS.primary}>
        <img src={src} alt="" className="img-cover width height" />
      </Rectangle>
    </HoverGrow>
  );
};
