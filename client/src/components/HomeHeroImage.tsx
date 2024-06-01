import React from "react";
import { IMAGES, SVGS } from "../assets";
import { useScreenSize } from "../providers";

export const HomeHeroImage = () => {
  const backStyles = {
    zIndex: 0,
  };
  const frontStyles = {
    maskImage: `url(${SVGS.Computer})`,
    maskRepeat: "no-repeat",
    maskSize: "100%",
    maskPosition: "center",
    zIndex: 1,
  };

  const { ltSmall } = useScreenSize();

  return (
    <div
      style={{
        width: "100%",
        height: 450,
        overflow: "hidden",
      }}
      className="rad-20 relative"
    >
      <img
        className="width height absolute-fill"
        style={{
          objectFit: "cover",
          filter: "blur(2px)",
          ...backStyles,
        }}
        src={IMAGES.ReactCode}
        alt="Code"
      />
      <img
        style={{
          objectFit: "fill",
          ...frontStyles,
        }}
        className="width height"
        src={IMAGES.FlipLogin}
        alt={"Flip GPT"}
      />
    </div>
  );
};
