import { useMotionValueEvent, useScroll } from "framer-motion";
import { RefObject, useRef, useState } from "react";

export const useVerticalDirection = (ref: RefObject<HTMLElement>) => {
  const pastValue = useRef(0);
  const [direction, setDirection] = useState<"Down" | "Up">("Down");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (pastValue.current < latest && direction !== "Down") {
      setDirection("Down");
    }

    if (pastValue.current > latest && direction !== "Up") {
      setDirection("Up");
    }

    pastValue.current = latest;
  });

  return direction;
};
