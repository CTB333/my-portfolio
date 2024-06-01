import React, { useCallback } from "react";
import { Rectangle, ShapeImage } from "./shapes";
import { COLORS } from "../constants";
import { IMAGES } from "../assets";

import { Easing } from "framer-motion";

import { AnimationFunction, useRunAnimationOnce } from "../hooks";
import { useScreenSize } from "../providers";

const useFlipGPTAnimation = () => {
  const Box1 = ".FlipBox1";
  const Box2 = ".FlipBox2";
  const Box3 = ".FlipBox3";
  const Box4 = ".FlipBox4";

  const runAnimation = useCallback((animate: AnimationFunction) => {
    const ease: Easing = "backOut";
    const duration = 1;

    animate(
      Box1,
      {
        x: "-50%",
        y: "-100%",
        scale: 1,
      },
      { duration, ease }
    );

    animate(
      Box2,
      {
        x: "20%",
        y: "-50%",
        scale: 1.1,
      },
      { duration, ease }
    );

    animate(
      Box3,
      {
        x: "-70%",
        y: "10%",
        scale: 1.05,
      },
      { duration, ease }
    );

    animate(
      Box4,
      {
        x: "25%",
        y: "80%",
        scale: 1.35,
      },
      { duration, ease }
    );
  }, []);

  const resetAnimation = useCallback((animate: AnimationFunction) => {
    const duration = 0.1;

    animate(
      Box1,
      {
        x: 0,
        y: 0,
        scale: 1,
      },
      { duration }
    );
    animate(
      Box2,
      {
        x: 0,
        y: 0,
        scale: 1,
      },
      { duration }
    );
    animate(
      Box3,
      {
        x: 0,
        y: 0,
        scale: 1,
      },
      { duration }
    );
    animate(
      Box4,
      {
        x: 0,
        y: 0,
        scale: 1,
      },
      { duration }
    );
  }, []);

  const [scope, test] = useRunAnimationOnce({
    runAnimation,
    resetAnimation,
  });

  return {
    scope,
    test,
  };
};

export const FlipGPTImages = () => {
  const { scope: scrollRef, test } = useFlipGPTAnimation();

  const { ltSmall } = useScreenSize();
  return (
    <div ref={scrollRef} className="relative flex center">
      <Rectangle
        className="hidden"
        size={ltSmall ? 2 : 6}
        color={COLORS.accent}
      />

      <div onClick={test} className="absolute-fill no-click">
        <ShapeImage
          size={ltSmall ? 1 : undefined}
          clickable={false}
          animationClass={"FlipBox1"}
          src={IMAGES.FlipLogin}
        />
        <ShapeImage
          size={ltSmall ? 1 : undefined}
          clickable={false}
          animationClass={"FlipBox2"}
          src={IMAGES.FlipTopic}
        />
        <ShapeImage
          size={ltSmall ? 1 : undefined}
          clickable={false}
          animationClass={"FlipBox3"}
          src={IMAGES.FlipCard}
        />
        <ShapeImage
          size={ltSmall ? 1 : undefined}
          clickable={false}
          animationClass={"FlipBox4"}
          src={IMAGES.FlipHistory}
        />
      </div>
    </div>
  );
};
