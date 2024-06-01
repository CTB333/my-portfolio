import React, { useCallback } from "react";
import { Rectangle, ShapeImage } from "./shapes";
import { COLORS } from "../constants";
import { IMAGES } from "../assets";

import { Easing } from "framer-motion";

import { AnimationFunction, useRunAnimationOnce } from "../hooks";
import { useScreenSize } from "../providers";

const useComixAnimation = () => {
  const TopRight = ".ComixTopRight";
  const TopLeft = ".ComixTopLeft";
  const BottomRight = ".ComixBottomRight";
  const BottomLeft = ".ComixBottomLeft";
  const Middle = ".ComixMiddle";

  const runAnimation = useCallback((animate: AnimationFunction) => {
    const ease: Easing = "backOut";
    const duration = 1;
    const delay = duration / 2;

    animate(Middle, { scale: 1 }, { duration: delay, ease });

    animate(
      TopRight,
      {
        x: "90%",
        y: "-60%",
        scale: 0.8,
        opacity: 1,
      },
      { duration, delay, ease }
    );

    animate(
      TopLeft,
      {
        x: "-90%",
        y: "-70%",
        scale: 1.1,
        opacity: 1,
      },
      { duration, delay, ease }
    );
    animate(
      BottomRight,
      {
        x: "90%",
        y: "70%",
        scale: 1.1,
        opacity: 1,
      },
      { duration, delay, ease }
    );
    animate(
      BottomLeft,
      {
        x: "-90%",
        y: "60%",
        scale: 0.9,
        opacity: 1,
      },
      { duration, delay, ease }
    );
  }, []);

  const resetAnimation = useCallback((animate: AnimationFunction) => {
    const duration = 0.1;

    animate(Middle, { scale: 0.5 }, { duration });
    animate(
      TopRight,
      {
        x: 0,
        y: 0,
        scale: 0.5,
        opacity: 0,
      },
      { duration }
    );
    animate(
      TopLeft,
      {
        x: 0,
        y: 0,
        scale: 0.5,
        opacity: 0,
      },
      { duration }
    );
    animate(
      BottomRight,
      {
        x: 0,
        y: 0,
        scale: 0.5,
        opacity: 0,
      },
      { duration }
    );
    animate(
      BottomLeft,
      {
        x: 0,
        y: 0,
        scale: 0.5,
        opacity: 0,
      },
      { duration }
    );
  }, []);

  const [scope, test] = useRunAnimationOnce({
    runAnimation,
    resetAnimation,
  });

  return { scope, test };
};

export const ComixImages = () => {
  const { scope: scrollRef } = useComixAnimation();

  const { ltSmall } = useScreenSize();

  return (
    <div ref={scrollRef} className="flex center relative">
      <Rectangle
        className="hidden"
        color={COLORS.accent}
        size={ltSmall ? 2 : 6}
      />

      <div className="absolute-fill flex center no-click">
        <ShapeImage
          size={ltSmall ? 1 : undefined}
          animationClass="ComixBottomLeft"
          clickable={false}
          src={IMAGES.ComixBook}
        />
        <ShapeImage
          size={ltSmall ? 1 : undefined}
          animationClass="ComixTopRight"
          clickable={false}
          src={IMAGES.ComixBook}
        />
        <ShapeImage
          size={ltSmall ? 1 : undefined}
          animationClass="ComixTopLeft"
          clickable={false}
          blur
          src={IMAGES.ReactCode}
        />
        <ShapeImage
          size={ltSmall ? 1 : undefined}
          animationClass="ComixBottomRight"
          clickable={false}
          blur
          src={IMAGES.ReactCode}
        />

        <ShapeImage
          clickable={false}
          animationClass="ComixMiddle"
          shape="Circle"
          size={ltSmall ? 2 : 4}
          color={COLORS.accent}
          src={IMAGES.ComixLibrary}
        />
      </div>
    </div>
  );
};
