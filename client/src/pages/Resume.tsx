import React from "react";
import {
  CircularPageCutout,
  HeroSection,
  HoverGrow,
  PdfViewer,
  ProgressBarProps,
  ProgressBars,
  Rectangle,
  TextButton,
} from "../components";
import { COLORS } from "../constants";
import { IMAGES } from "../assets";
import { useScrollToTop } from "../hooks";

import PdfResume from "../assets/pdf/resume.pdf";
import { useScreenSize } from "../providers";

export const Resume = () => {
  const softSkills: ProgressBarProps[] = [
    { filled: 5, title: "Creativity", src: undefined, icon: undefined },
    {
      filled: 5,
      title: "Software Architecture",
      src: undefined,
      icon: undefined,
    },
    { filled: 5, title: "Teamwork", src: undefined, icon: undefined },
    { filled: 5, title: "Math", src: undefined, icon: undefined },
    { filled: 4.5, title: "Communication", src: undefined, icon: undefined },
    { filled: 4, title: "Time Managment", src: undefined, icon: undefined },
    { filled: 4, title: "UI Design", src: undefined, icon: undefined },
    { filled: 3.5, title: "Team Managment", src: undefined, icon: undefined },
  ];

  const coding: ProgressBarProps[] = [
    { filled: 5, title: "Typescript", src: IMAGES.IconTs },
    { filled: 5, title: "Python", src: IMAGES.IconPython },
    { filled: 5, title: "React", src: IMAGES.IconReact },
    { filled: 5, title: "Node.js", src: IMAGES.IconNode },
    { filled: 5, title: "React Native", src: IMAGES.IconReact },
    { filled: 5, title: "MongoDB", src: IMAGES.IconMongo },
    { filled: 5, title: "Figma", src: IMAGES.IconFigma },
    { filled: 5, title: "Flask", src: IMAGES.IconPython },
    { filled: 5, title: "HTML", src: IMAGES.IconHtml },
    { filled: 5, title: "Javascript", src: IMAGES.IconJs },
    { filled: 5, title: "CSS", src: IMAGES.IconCSS },
    { filled: 5, title: "VS Code", src: IMAGES.IconVs },
    { filled: 4.5, title: "Java", src: IMAGES.IconJava },
    { filled: 4.5, title: "Stripe", src: IMAGES.IconStripe },
    { filled: 4, title: "GitHub", src: IMAGES.IconGithub },
    { filled: 4, title: "SQL", src: IMAGES.IconSql },
    { filled: 4, title: "Terraform", src: IMAGES.IconTf },
    { filled: 4, title: "Spring Boot", src: IMAGES.IconJava },
    { filled: 3.5, title: "C", src: IMAGES.IconC },
    { filled: 3.5, title: "C#", src: IMAGES.IconCSharp },
    { filled: 3.5, title: "C++", src: IMAGES.IconCPlus },
    { filled: 3.5, title: "Angular", src: IMAGES.IconAngular },
    { filled: 3.5, title: "GitLab", src: IMAGES.IconGitlab },
  ];

  useScrollToTop();

  const download = () => {
    const link = document.createElement("a");
    link.href = PdfResume;
    link.download = `ColinTondreauResume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { ltSmall, ltMedium, isMedSmall } = useScreenSize();

  return (
    <div className="pb-100 bg-secondary">
      <HeroSection
        left={
          <div className="width flex column ai-start">
            <p className="fs-2 bold color-primary font-2 mb-20">
              My Official Resume
            </p>
            <TextButton
              bold
              color={COLORS.primary}
              onPress={download}
              text="Download"
              buttonColor={COLORS.accent}
            />
          </div>
        }
        right={
          <div className="relative">
            <Rectangle
              className=""
              size={ltSmall ? 3 : 6}
              color={COLORS.accent}
            />
            <div className="absolute top-left">
              <HoverGrow clickable={false} stayActive>
                <Rectangle
                  className="shadow"
                  base={ltSmall ? 6 * 0.5 : 6}
                  length={ltSmall ? 8 * 0.5 : 8}
                  color={COLORS.primary}
                >
                  <PdfViewer scale={ltSmall ? 0.5 : 1} url={PdfResume} />
                </Rectangle>
              </HoverGrow>
            </div>
          </div>
        }
      />

      <div className="bg-primary">
        <div
          className={`spacer-1 flex  pt-25  ${
            isMedSmall
              ? "pt-100 center"
              : ltMedium
              ? "center"
              : "ai-start jc-start ph-100"
          }`}
        >
          <p className="fs-1 bold color-secondary font-2">All Skills</p>
        </div>

        <ProgressBars title="Soft Skills" bars={softSkills} />

        <div className="pv-25"></div>
        <ProgressBars title="Coding Capabilities" bars={coding} />

        <CircularPageCutout />
      </div>
    </div>
  );
};
