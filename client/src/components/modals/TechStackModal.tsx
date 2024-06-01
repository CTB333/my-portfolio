import React from "react";
import { LanguageCard, LanguageCardProps } from "../LanguageCard";
import { useScreenSize } from "../../providers";

type TechStackModalProps = {
  title: string;
  techStack: LanguageCardProps[];
};

export const TechStackModal = ({ title, techStack }: TechStackModalProps) => {
  const { ltMedSmall } = useScreenSize();
  return (
    <div>
      <p className={`fs-2 bold mb-20 ${ltMedSmall ? "text-center" : ""}`}>
        {title} Tech Stack
      </p>

      {techStack.map((props) => (
        <LanguageCard key={props.text} {...props} />
      ))}
    </div>
  );
};
