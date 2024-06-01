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
    <div
      className={`relative flex center even p-50 ${
        ltMedSmall ? "column" : "row"
      }`}
    >
      <div onClick={onClick} className={`flex-1 ${ltMedSmall ? "mb-50" : ""}`}>
        {left}
      </div>
      <div onClick={onClick} className={`flex-1 ${ltMedSmall ? "mt-50" : ""}`}>
        {right}
      </div>
    </div>
  );
};
