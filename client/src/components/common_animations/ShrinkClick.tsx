import React from "react";

import { motion } from "framer-motion";
import { BaseAnimationProps } from "./types";

type ShrinkClickProps = BaseAnimationProps & {
  pulse?: boolean;
};

export const ShrinkClick = ({
  disabled,
  onPress,
  children,
  className,
  to = 0.9,
  duration = 0.25,
  stayActive = false,
  pulse = false,
  clickable,
  style = {},
}: ShrinkClickProps) => {
  return (
    <motion.div
      style={style}
      initial={{ scale: 1 }}
      whileTap={{
        scale: clickable && !disabled ? [null, to, stayActive ? to : 1] : 1,
        transition: {
          duration: duration,
          repeat: pulse ? Infinity : 0,
          repeatDelay: 0.5,
        },
      }}
      className={(clickable && !disabled ? "clickable " : "") + className}
      onClick={!disabled ? onPress : undefined}
    >
      {children}
    </motion.div>
  );
};
