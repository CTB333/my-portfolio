import React, { ReactNode } from "react";
import { useScreenSize } from "../providers";

export type ProjectSectionProps = {
  left?: ReactNode;
  right?: ReactNode;
  onClick?: () => void;
};

export const ProjectSection = ({
  left,
  right,
  onClick,
}: ProjectSectionProps) => {
  const { ltMedSmall } = useScreenSize();

  return (
    <div className={`relative  ${ltMedSmall ? "p-25" : "p-50 ph-25"}`}>
      <div
        className={`shadow relative flex center even ph-35 pv-50 rad-8 ${
          ltMedSmall ? "column" : "row"
        }`}
      >
        <div
          onClick={onClick}
          className={`flex-1 ${ltMedSmall ? "mb-50 mt-25" : ""}`}
        >
          {left}
        </div>
        <div
          onClick={onClick}
          className={`flex-1 ${ltMedSmall ? "mt-50" : ""}`}
        >
          {right}
        </div>
      </div>
    </div>
  );
};
