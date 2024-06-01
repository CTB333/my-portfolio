import { useCallback, useState } from "react";
import { AnimationFunction, useRunAnimationOnce } from "./useRunAnimationOnce";

export const useScaleEntrance = (className: string) => {
  const [animationRunning, setAnimationRunning] = useState(false);

  const runAnimation = useCallback(
    async (animate: AnimationFunction) => {
      setAnimationRunning(true);
      await animate(className, { scale: 1 }, { duration: 1, ease: "backOut" });
      setAnimationRunning(false);
    },
    [className]
  );

  const resetAnimation = useCallback(
    (animate: AnimationFunction) => {
      animate(className, { scale: 0 }, { duration: 0.1 });
    },
    [className]
  );

  const [scope, test] = useRunAnimationOnce({
    runAnimation,
    resetAnimation,
  });

  return { scope, test, animationRunning };
};
