import React, { useCallback } from "react";
import { Rectangle, ShapeImage } from "./shapes";
import { IMAGES } from "../assets";
import { COLORS } from "../constants";
import { AnimationFunction, useRunAnimationOnce } from "../hooks";
import { Easing } from "framer-motion";
import { useScreenSize } from "../providers";

const usePortfolioAnimation = () => {
  const Top = ".PortfolioTriangleTop";
  const Bottom = ".PortfolioTriangleBottom";
  const Circle = ".PortfolioCircle";

  const firstAnimation = async (animate: AnimationFunction) => {
    const duration = 1;
    const ease: Easing = "backOut";

    animate(
      Circle,
      {
        scale: 0.9,
      },
      { duration, ease }
    );
    animate(
      Top,
      {
        scale: 1.25,
      },
      { duration, ease }
    );
    await animate(
      Bottom,
      {
        scale: 1.25,
      },
      { duration, ease }
    );
  };

  const secondAnimation = async (animate: AnimationFunction) => {
    const duration = 1;
    const ease: Easing = "backOut";

    animate(
      Top,
      {
        rotate: "-45deg",
      },
      { duration, ease }
    );
    await animate(
      Bottom,
      {
        rotate: "-45deg",
      },
      { duration, ease }
    );
  };

  const thirdAnimation = async (animate: AnimationFunction) => {
    const duration = 1;
    const ease: Easing = "backOut";

    animate(
      Circle,
      {
        scale: 1,
      },
      { duration, ease }
    );
    animate(
      Top,
      {
        y: "50%",
        scale: 1.1,
      },
      { duration, ease }
    );
    await animate(
      Bottom,
      {
        y: "-50%",
        scale: 1.1,
      },
      { duration, ease }
    );
  };

  const runAnimation = useCallback(async (animate: AnimationFunction) => {
    await firstAnimation(animate);

    await secondAnimation(animate);

    await thirdAnimation(animate);
  }, []);

  const resetAnimation = useCallback((animate: AnimationFunction) => {
    const duration = 0.1;

    animate(Top, { y: 0, rotate: "0deg", scale: 0.1 }, { duration });
    animate(Bottom, { y: 0, rotate: "0deg", scale: 0.1 }, { duration });
    animate(Circle, { y: 0, rotate: "0deg", scale: 0.1 }, { duration });
  }, []);

  const [scope, test] = useRunAnimationOnce({
    runAnimation,
    resetAnimation,
  });

  return { scope, test };
};

export const PortfolioImages = () => {
  const { scope: scrollRef } = usePortfolioAnimation();

  const { ltSmall } = useScreenSize();
  return (
    <div ref={scrollRef} className="flex center relative">
      <Rectangle
        className="hidden"
        color={COLORS.accent}
        size={ltSmall ? 2 : 6}
      />

      <div className="absolute-fill flex center  z-0">
        <ShapeImage
          clickable={false}
          animationClass="PortfolioTriangleTop"
          shape="Triangle"
          rotation="rightAngleTopRight"
          src={IMAGES.ReactCode}
          blur
          size={ltSmall ? 2.5 : 4}
        />
        <ShapeImage
          clickable={false}
          animationClass="PortfolioTriangleBottom"
          shape="Triangle"
          rotation="rightAngleBottomLeft"
          src={IMAGES.ReactCode}
          size={ltSmall ? 2.5 : 4}
          blur
        />
        <ShapeImage
          clickable={false}
          animationClass="PortfolioCircle"
          shape="Circle"
          size={ltSmall ? 3.125 : 5}
          src={IMAGES.JC}
        />
      </div>
    </div>
  );
};
