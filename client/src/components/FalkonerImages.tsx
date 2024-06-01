import React, { useCallback } from "react";
import { Rectangle, ShapeImage } from "./shapes";
import { COLORS } from "../constants";
import { AnimationFunction, useRunAnimationOnce } from "../hooks";
import { IMAGES } from "../assets";
import { Easing } from "framer-motion";
import { useScreenSize } from "../providers";

const useFalkonerImages = () => {
  const BottomSquare = ".FalkonerBottomRight";
  const TopSquare = ".FalkonerTopLeft";
  const MiddleSquare = ".FalkonerMiddle";

  const runAnimation = useCallback((animate: AnimationFunction) => {
    const ease: Easing = "backOut";
    const smallSquareDuration = 1;
    animate(
      BottomSquare,
      { x: "75%", y: "75%", scale: 1 },
      { duration: smallSquareDuration, ease }
    );
    animate(
      TopSquare,
      { x: "-75%", y: "-75%", scale: 1 },
      { duration: smallSquareDuration, ease }
    );
    animate(
      MiddleSquare,
      { scale: 1 },
      { ease, delay: smallSquareDuration, duration: smallSquareDuration / 2 }
    );
  }, []);

  const resetAnimation = useCallback((animate: AnimationFunction) => {
    animate(BottomSquare, { x: "75%", y: "75%", scale: 0 }, { duration: 0.1 });
    animate(TopSquare, { x: "-75%", y: "-75%", scale: 0 }, { duration: 0.1 });
    animate(MiddleSquare, { scale: 0 }, { duration: 0.1 });
  }, []);

  const [scrollRef, test] = useRunAnimationOnce({
    runAnimation,
    resetAnimation,
  });

  return { scrollRef, test };
};

export const FalkonerImages = () => {
  const { scrollRef, test } = useFalkonerImages();

  const { ltSmall } = useScreenSize();

  return (
    <div ref={scrollRef} className="flex center relative">
      <Rectangle
        className="hidden"
        color={COLORS.accent}
        size={ltSmall ? 2 : 6}
      />

      <div onClick={test} className="absolute-fill flex center  z-0">
        <ShapeImage
          clickable={false}
          animationClass="FalkonerMiddle"
          size={ltSmall ? 2.25 : 4.5}
          src={IMAGES.FalconerCode}
          blur
        />

        <ShapeImage
          clickable={false}
          shape="Triangle"
          animationClass="FalkonerBottomRight"
          rotation="rightAngleDoubleRight"
          size={ltSmall ? 1.25 : 2.5}
          src={IMAGES.FalconerLogo}
        />

        <ShapeImage
          clickable={false}
          shape="Triangle"
          animationClass="FalkonerTopLeft"
          rotation="rightAngleDoubleLeft"
          size={ltSmall ? 1.25 : 2.5}
          src={IMAGES.FalconerAdmin}
          imgStyle={{ objectPosition: "0% 0%" }}
        />
      </div>
    </div>
  );
};
