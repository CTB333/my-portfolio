import { useCallback } from "react";
import { Rectangle, ShapeImage } from "./shapes";
import { COLORS } from "../constants";
import { IMAGES } from "../assets";

import { AnimationFunction, useRunAnimationOnce } from "../hooks";
import { useScreenSize } from "../providers";

const useTranscribiaAnimation = () => {
  const Triangle = "#Transcribia-Triangle";
  const Circle = "#Transcribia-Circle";

  const runAnimation = useCallback(async (animate: AnimationFunction) => {
    animate(Triangle, { scale: 1, opacity: 1, x: "-25%" }, { duration: 0.75 });
    animate(Circle, { scale: 1, opacity: 1, x: "25%" }, { duration: 0.75 });
  }, []);

  const resetAnimation = useCallback(async (animate: AnimationFunction) => {
    animate(Triangle, { scale: 0.5, opacity: 0, x: 0 }, { duration: 0.1 });
    animate(Circle, { scale: 0.5, opacity: 0, x: 0 }, { duration: 0.1 });
  }, []);

  const [scrollRef] = useRunAnimationOnce({
    runAnimation,
    resetAnimation,
  });

  return scrollRef;
};

export const TransciribiaImages = () => {
  const scrollRef = useTranscribiaAnimation();

  const { ltSmall, ltMedSmall } = useScreenSize();
  return (
    <div ref={scrollRef} className="flex center relative">
      <Rectangle
        className="hidden"
        color={COLORS.accent}
        size={ltSmall ? 3 : ltMedSmall ? 4.5 : 6}
      />

      <div className="absolute-fill flex center  z-0">
        <ShapeImage
          clickable={false}
          id="Transcribia-Circle"
          animation={{}}
          shape="Circle"
          src={IMAGES.Transcribia}
          size={ltSmall ? 2 : 3.5}
        />
        <ShapeImage
          clickable={false}
          id={"Transcribia-Triangle"}
          shape="Triangle"
          rotation="right"
          blur
          src={IMAGES.TranscribiaCode}
          size={ltSmall ? 2 : 3.5}
        />
      </div>
    </div>
  );
};
