import React from "react";

import { Variants, motion } from "framer-motion";
import { BaseAnimationProps } from "./types";

type HoverGrowProps = BaseAnimationProps & {};

export const HoverGrow = ({
  children,
  className,
  disabled,
  style = {},
  clickable = true,
  to = 1.05,
  duration = 0.25,
  stayActive = false,
  onPress,
}: HoverGrowProps) => {
  const variants: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: [null, to, stayActive ? to : 1],
      transition: { duration: duration },
    },
  };

  if (disabled)
    return (
      <motion.div
        style={{
          ...style,
          pointerEvents: "visible",
        }}
        className={(clickable ? "clickable " : "") + className}
      >
        {children}
      </motion.div>
    );

  return (
    <motion.div
      onClick={onPress}
      variants={variants}
      initial={"rest"}
      whileHover={"hover"}
      className={(clickable ? "clickable " : "") + className}
      style={{
        ...style,
        pointerEvents: "visible",
      }}
    >
      {children}
    </motion.div>
  );
};
