import { motion } from "framer-motion";
import React from "react";
import { BaseAnimationProps } from "./types";

type OpacityToggleProps = Omit<BaseAnimationProps, "stayActive"> & {
  infinite?: boolean;
  from?: number;
  repeat?: number;
};

export const OpacityToggle = ({
  children,
  from = 0,
  to = 1,
  duration = 1,
  className,
  infinite,
  repeat,
}: OpacityToggleProps) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: from,
      }}
      animate={{
        opacity: to,
      }}
      transition={{
        repeatType: "reverse",
        duration: duration,
        repeat: infinite ? Infinity : repeat ?? 0,
        repeatDelay: duration * 0.55,
      }}
    >
      {children}
    </motion.div>
  );
};
