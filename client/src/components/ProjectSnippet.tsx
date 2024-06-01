import React from "react";
import { LanguageCard, LanguageCardProps } from "./LanguageCard";
import { HoverGrow } from "./common_animations";

type ProjectSnippetProps = {
  title: string;
  desc: string;
  techStack: LanguageCardProps[];
  onPress?: () => void;
};

export const ProjectSnippet = ({
  title,
  desc,
  techStack,
  onPress,
}: ProjectSnippetProps) => {
  const firstTwo = techStack.length > 2 ? techStack.slice(0, 2) : techStack;
  return (
    <div className="width height flex column">
      <HoverGrow
        onPress={onPress}
        clickable={onPress ? true : false}
        stayActive
      >
        <p className="fs-2 bold">{title}</p>
        <p className="mt-10 mb-20">{desc}</p>
        <p className="fs-3 bold">Tech Stack</p>
        <div className="flex column width">
          {firstTwo.map((props) => (
            <LanguageCard key={props.text} {...props} />
          ))}
          {firstTwo.length !== techStack.length ? (
            <LanguageCard
              text={`+ ${techStack.length - firstTwo.length} more`}
            />
          ) : null}
        </div>
      </HoverGrow>
    </div>
  );
};
