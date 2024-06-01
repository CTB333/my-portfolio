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
    { title: "Teamwork", src: undefined, icon: undefined },
    { title: "Communication", src: undefined, icon: undefined },
    { title: "Math", src: undefined, icon: undefined },
    { title: "Time Managment", src: undefined, icon: undefined },
  ];
  const improving: ProgressBarProps[] = [
    { title: "Team Managment", src: undefined, icon: undefined },
  ];
  const coding: ProgressBarProps[] = [
    { title: "HTML", src: IMAGES.IconHtml },
    { title: "Javascript", src: IMAGES.IconJs },
    { title: "Typescript", src: IMAGES.IconTs },
    { title: "Angular", src: IMAGES.IconAngular },
    { title: "React", src: IMAGES.IconReact },
    { title: "React Native", src: IMAGES.IconReact },
    { title: "Node.js", src: IMAGES.IconNode },
    { title: "NPM", src: IMAGES.IconNpm },
    { title: "Java", src: IMAGES.IconJava },
    { title: "Spring Boot", src: IMAGES.IconJava },
    { title: "Python", src: IMAGES.IconPython },
    { title: "Flask", src: IMAGES.IconPython },
    { title: "Terraform", src: IMAGES.IconTf },
    { title: "SQL", src: IMAGES.IconSql },
    { title: "VS Code", src: IMAGES.IconVs },
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
            <p className="fs-2 bold color-primary mb-20">My Official Resume</p>
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
          <p className="fs-1 bold color-secondary">All Skills</p>
        </div>

        <ProgressBars title="Soft Skills" bars={softSkills} />
        <div className="pv-25"></div>
        <ProgressBars title="Currently Improving" bars={improving} />
        <div className="pv-25"></div>
        <ProgressBars title="Coding Capabilities" bars={coding} />

        <CircularPageCutout />
      </div>
    </div>
  );
};
