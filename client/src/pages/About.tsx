import React, { useCallback, useState } from "react";
import {
  AboutImages,
  CircularPageCutout,
  HeroSection,
  HoverGrow,
  RITLogo,
  Rectangle,
  TextButton,
} from "../components";
import { COLORS } from "../constants";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "../hooks";
import { IMAGES } from "../assets";
import { useScreenSize } from "../providers";
import { responsiveNumber } from "../utils";

const useAbout = () => {
  useScrollToTop();

  const navigate = useNavigate();
  const toContact = () => navigate("/contact");

  const [index, setIndex] = useState(0);

  const AllImages = [
    [
      IMAGES.AboutImage19,
      IMAGES.AboutImage29,
      // Footer
      IMAGES.AboutImage2,
      IMAGES.AboutImage4,
      IMAGES.AboutImage1,
      IMAGES.AboutImage5,
      // Middle
      IMAGES.AboutImage9,
      IMAGES.AboutImage7,
      IMAGES.AboutImage11,
      IMAGES.AboutImage20,
    ],
    [
      IMAGES.AboutImage19,
      IMAGES.AboutImage29,
      // Footer
      IMAGES.AboutImage15,
      IMAGES.AboutImage16,
      IMAGES.AboutImage10,
      IMAGES.AboutImage6,
      // Middle
      IMAGES.AboutImage9,
      IMAGES.AboutImage12,
      IMAGES.AboutImage3,
      IMAGES.AboutImage8,
    ],
  ];

  const images = AllImages[index];

  const changeImages = () => {
    if (index < AllImages.length - 1) setIndex((prev) => prev + 1);
    else setIndex(0);
  };

  return {
    images,
    toContact,
    changeImages,
  };
};

export const About = () => {
  const { images, toContact, changeImages } = useAbout();

  const { ltMedium, ltSmall, width } = useScreenSize();

  const base =
    4 *
    responsiveNumber(width, ltSmall ? 0.8 : 1, {
      iphone5: 0.65,
    });
  const length =
    5 *
    responsiveNumber(width, ltSmall ? 0.8 : 1, {
      iphone5: 0.65,
    });

  const SchoolPhoto = useCallback(
    () => (
      <div
        className={`relative flex-1 flex center jc-end  ${
          ltMedium ? "pb-50" : "pr-50"
        }`}
      >
        <HoverGrow stayActive>
          <Rectangle
            className="shadow"
            base={base}
            length={length}
            color={COLORS.accent}
          >
            <img src={images[1]} alt={"Me"} />
          </Rectangle>
        </HoverGrow>
      </div>
    ),
    [base, images, length, ltMedium]
  );

  const SchoolText = useCallback(
    () => (
      <div className={`flex-1 flex center ${ltMedium ? "" : "pl-50"} `}>
        <p>
          Originally I had second thoughts about attending college, it wasn't
          until my senior year that I was introduced to software engineering and
          coding and almost immediately I had found a passion for the work. I
          learned everything I could possibly find on coding, but never felt it
          was enough. I wanted to be better than just good, I wanted to learn
          everything possible and I wanted to know it like the back of my hand.
          For me continuing school would be the best option for my goals. So I
          moved out of my hometown and started life at RIT with the goal of
          perfecting my craft. I'm only a couple of years away from graduation
          now and while I think I have made a lot of progress towards my goals
          theres still a lot of work to do and much that I could learn.
        </p>
      </div>
    ),
    [ltMedium]
  );

  return (
    <div className="bg-primary">
      <HeroSection
        left={
          <div className="flex column color-primary">
            <p className="fs-2 font-2 bold">
              Hi My Name Is <br /> Colin Tondreau
            </p>
            <p className="mv-15">
              I'm a software engineer and an artist. I have a passion for design
              and creative problem solving which helps me give you nothing but
              the best in the quality of a project.{" "}
              <span className="bold">
                Have a project idea? Looking for a dedicated developer?
              </span>
            </p>

            <div className="flex">
              <TextButton
                bold
                text="Lets Get In Touch"
                size={3}
                color={COLORS.primary}
                buttonColor={COLORS.accent}
                onPress={toContact}
              />
            </div>
          </div>
        }
        right={
          <div className="flex center ">
            <HoverGrow stayActive>
              <Rectangle
                className="shadow"
                base={base}
                length={length}
                color={COLORS.primary}
              >
                <img src={images[0]} alt={"Me"} />
              </Rectangle>
            </HoverGrow>
          </div>
        }
      />

      <RITLogo />

      <div className="flex center">
        <p className="fs-2 font-2 bold text-center">
          Rochester Institute of Technology
        </p>
      </div>

      <div
        className={`flex ${
          ltMedium
            ? "ph-50 column center pv-50"
            : "center ph-100 pv-50 mv-100 row"
        } `}
      >
        <SchoolPhoto />
        <SchoolText />
      </div>

      <CircularPageCutout inverted />

      <div className={`bg-secondary pb-100 color-primary`}>
        <AboutImages onPress={changeImages} images={images.splice(2)} />

        <div className={`pt-50 ${ltSmall ? "ph-50" : "ph-100"}`}>
          <p className="fs-1 bold font-2 text-center">This Is Me</p>
          <p className={"text-center"}>
            At my core I am a artist, an engineer and a student. I've always
            loved drawing, coloring and creating appealing pictures sometimes
            becoming obsessed with the small details. As a pre-teen I would stay
            up past my bed time on YouTube searching up a different topic of
            'How to build/create/make abcd...' and as I ended middle school I
            became obsessed with figuring out electronics. I thought I was going
            to be an electrical engineer and then I found software and it was
            the perfect blend of who I am. Above are the people/companions that
            mean the most to me and without them I wouldn't be where I am today.
          </p>
        </div>
      </div>
    </div>
  );
};
