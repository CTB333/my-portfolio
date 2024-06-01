import React from "react";

import { ProgressBarProps } from "./ProgressBar";
import { IMAGES } from "../assets";
import { TextButton } from "./buttons";
import { COLORS } from "../constants";
import { useNavigate } from "react-router-dom";
import { ProgressBars } from "./ProgressBars";
import { useScreenSize } from "../providers";

export const CodingCapabilities = () => {
  const navigate = useNavigate();
  const bars: ProgressBarProps[] = [
    { title: "Typescript", src: IMAGES.IconTs },
    { title: "Python", src: IMAGES.IconPython },
    { title: "Java", src: IMAGES.IconJava },
    { title: "React", src: IMAGES.IconReact },
    { title: "Node.js", src: IMAGES.IconNode },
  ];
  const toResume = () => navigate("/resume");

  const { ltSmall } = useScreenSize();
  return (
    <div
      className={`${
        ltSmall ? "p-0" : "p-50"
      } relative color-primary flex center`}
    >
      <div
        className={`bg-secondary flex-1 ${
          ltSmall ? "p-0 pv-50" : "p-100 rad-20"
        } flex column color-primary`}
      >
        <ProgressBars bars={bars} title="Coding Capabilities" />

        <div className="flex center">
          <TextButton
            onPress={toResume}
            text="See All"
            outline
            color={COLORS.primary}
          />
        </div>
      </div>
    </div>
  );
};
