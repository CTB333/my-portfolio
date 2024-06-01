import {
  MotionStyle,
  MotionValue,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";
import { OpacityToggle } from "./common_animations";
import { Icon } from "./Icon";
import { useScreenSize } from "../providers";

const START = 0.4;
const END = 1;
const INTERPOLATION = [START, END];

const useArrowAnimation = (value: MotionValue<number>): MotionStyle => {
  const OA = 1;
  const OB = 0.2;

  const opacity = useTransform(value, INTERPOLATION, [OA, OB]);

  return {
    opacity,
  };
};

const useWordAnimation = (value: MotionValue<number>): MotionStyle => {
  const YA = 100;
  const YB = 0;

  const SB = 0.75;
  const SC = 1;

  const y = useTransform(value, INTERPOLATION, [YA, YB]);
  const scale = useTransform(value, INTERPOLATION, [SB, SC]);

  return {
    y,
    scale,
  };
};

export const HomeProjectHeading = () => {
  const iconContainerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: iconContainerRef,
    offset: ["start end", "end end"],
  });

  const arrowStyles = useArrowAnimation(scrollYProgress);
  const wordStyles = useWordAnimation(scrollYProgress);

  const { ltSmall } = useScreenSize();

  return (
    <div
      ref={iconContainerRef}
      id="Projects"
      className="flex relative center pv-25 bg-secondary"
    >
      <div className="absolute-fill flex center">
        <motion.div layout style={arrowStyles} className="relative">
          <OpacityToggle infinite from={0.1} to={0.7} duration={1.25}>
            <Icon name="doubleUp" size={ltSmall ? 5 : 8} />
          </OpacityToggle>
        </motion.div>
      </div>

      <motion.p
        layout
        style={{ ...wordStyles }}
        className="fs-1 dark color-primary"
      >
        Projects
      </motion.p>
    </div>
  );
};
