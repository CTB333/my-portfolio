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
    { title: "Typescript", src: IMAGES.IconTs, filled: 5 },
    { title: "Python", src: IMAGES.IconPython, filled: 5 },
    { title: "Java", src: IMAGES.IconJava, filled: 5 },
    { title: "React", src: IMAGES.IconReact, filled: 5 },
    { title: "Node.js", src: IMAGES.IconNode, filled: 5 },
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
