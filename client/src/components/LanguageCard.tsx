import React, { ImgHTMLAttributes } from "react";
import { HoverGrow } from "./common_animations";
import { useScaleEntrance } from "../hooks";

export type LanguageCardProps = {
  text: string;
  src?: ImgHTMLAttributes<HTMLImageElement>["src"];
};

export const LanguageCard = ({ text, src }: LanguageCardProps) => {
  const { scope, animationRunning } = useScaleEntrance(".language-card");
  return (
    <div ref={scope} className="relative mt-20">
      <HoverGrow
        disabled={animationRunning}
        clickable={false}
        className="language-card p-20 bg-primary color-secondary flex center space shadow rad-8"
      >
        <p>{text}</p>
        <div style={{ width: 32, height: 32 }}>
          {src ? (
            <img alt="Ts" className="width height img-contain" src={src} />
          ) : null}
        </div>
      </HoverGrow>
    </div>
  );
};
