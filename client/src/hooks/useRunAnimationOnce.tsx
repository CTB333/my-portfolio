import {
  AnimationScope,
  animate,
  useAnimate,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";

export type AnimationFunction = typeof animate;

type UseRunAnimationOnceProps = {
  container?: RefObject<HTMLElement> | undefined;
  startAnimationAfter?: number;
  runAnimation: (ani: AnimationFunction) => Promise<void> | void;
  resetAnimation: (ani: AnimationFunction) => Promise<void> | void;
};

export const useRunAnimationOnce = ({
  runAnimation,
  resetAnimation,
  container,
  startAnimationAfter = 0.5,
}: UseRunAnimationOnceProps): [
  AnimationScope<any>,
  () => void,
  AnimationFunction
] => {
  let clicked = useRef(0).current;

  const [scrollRef, animate] = useAnimate();

  const inView = useInView(scrollRef, {
    amount: startAnimationAfter,
  });

  const { scrollYProgress } = useScroll({
    target: container ? container : scrollRef,
    offset: ["start end", "end end"],
  });

  const [allowAnimation, setAllowAnimation] = useState(true);
  const [animationRan, setAnimationRan] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 1) {
      setAllowAnimation(false);
    }

    if (latest <= 0) {
      setAllowAnimation(true);
    }
  });

  useEffect(() => {
    const run = async () => {
      await runAnimation(animate);
      setAnimationRan(true);
    };

    const reset = async () => {
      await resetAnimation(animate);
      setAnimationRan(false);
    };

    const handleEffect = () => {
      if (!animationRan && !allowAnimation) {
        run();
      }

      if (!allowAnimation) return;

      if (inView) run();
      else reset();
    };

    handleEffect();
  }, [
    inView,
    animate,
    resetAnimation,
    runAnimation,
    allowAnimation,
    animationRan,
  ]);

  const test = () => {
    if (clicked % 2 === 0) runAnimation(animate);
    else resetAnimation(animate);
    clicked += 1;
  };

  return [scrollRef, test, animate];
};
