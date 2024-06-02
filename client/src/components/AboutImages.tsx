import React, { useCallback, useState } from "react";
import { Rectangle } from "./shapes";
import { COLORS } from "../constants";
import { ShrinkClick } from "./common_animations";

import { AnimationFunction, useRunAnimationOnce } from "../hooks";
import { Easing, motion } from "framer-motion";
import { useScreenSize } from "../providers";
import { AboutImage } from "./AboutImage";

const useAboutImages = (onFunctionalPress?: () => void) => {
  const LeftMost = ".left-left-images";
  const Left = ".left-images";
  const Middle = ".middle-image";
  const Right = ".right-images";
  const RightMost = ".right-right-images";

  const OpenDuration = 0.75;
  const OpenEase: Easing = "backOut";
  const CloseDuration = OpenDuration;

  const [isAnimating, setIsAnimating] = useState(false);

  const animateOpen = useCallback(
    async (animate: AnimationFunction) => {
      setIsAnimating(true);

      const x = 0;

      animate(Middle, { x }, { duration: CloseDuration, ease: OpenEase });
      animate(LeftMost, { x }, { duration: CloseDuration, ease: OpenEase });
      animate(Left, { x }, { duration: CloseDuration, ease: OpenEase });
      animate(Right, { x }, { duration: CloseDuration, ease: OpenEase });
      await animate(
        RightMost,
        { x },
        { duration: CloseDuration, ease: OpenEase }
      );

      setIsAnimating(false);
    },
    [CloseDuration]
  );

  const animateCloseQuick = useCallback(async (animate: AnimationFunction) => {
    setIsAnimating(true);

    animate(LeftMost, { x: "200%" }, { duration: OpenDuration });
    animate(
      Left,
      { x: "120%" },
      { duration: OpenDuration / 2, delay: OpenDuration / 4 }
    );
    animate(
      Right,
      { x: "-120%" },
      { duration: OpenDuration / 2, delay: OpenDuration / 4 }
    );
    await animate(RightMost, { x: "-200%" }, { duration: OpenDuration });

    setIsAnimating(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [scope, _, animate] = useRunAnimationOnce({
    runAnimation: animateOpen,
    resetAnimation: animateCloseQuick,
  });

  const onAnimatedPress = async () => {
    await animateCloseQuick(animate);
    if (onFunctionalPress) onFunctionalPress();
    await animateOpen(animate);
  };

  return {
    scope,
    onAnimatedPress,
    isAnimating,
  };
};

type AboutImagesProps = {
  images: any[];
  onPress?: () => void;
};

export const AboutImages = ({ images, onPress }: AboutImagesProps) => {
  const { scope, onAnimatedPress, isAnimating } = useAboutImages(onPress);

  const { ltMedium, ltMedSmall, ltSmall } = useScreenSize();

  const mediumMult = 0.75;
  const medSmallMult = 0.6;
  const smallMult = 0.35;

  const margin = ltSmall ? 10 : 20;

  const hiddenSize = ltSmall
    ? 5.2 * smallMult
    : ltMedSmall
    ? 5.2 * medSmallMult
    : ltMedium
    ? 5.2 * mediumMult
    : 5.2;

  const leftMostBase = ltSmall
    ? 3.25 * smallMult
    : ltMedSmall
    ? 3.25 * medSmallMult
    : ltMedium
    ? 3.25 * mediumMult
    : 3.25;
  const leftMostLength = ltSmall
    ? 1.8 * smallMult
    : ltMedSmall
    ? 1.8 * medSmallMult
    : ltMedium
    ? 1.8 * mediumMult
    : 1.8;

  const leftBase = ltSmall
    ? 2.5 * smallMult
    : ltMedSmall
    ? 2.5 * medSmallMult
    : ltMedium
    ? 2.5 * mediumMult
    : 2.5;
  const leftLength = ltSmall
    ? 1.5 * smallMult
    : ltMedSmall
    ? 1.5 * medSmallMult
    : ltMedium
    ? 1.5 * mediumMult
    : 1.5;

  const middle = ltSmall
    ? 5.0 * smallMult
    : ltMedSmall
    ? 5.0 * medSmallMult
    : ltMedium
    ? 5.0 * mediumMult
    : 5.0;

  const rightBase = ltSmall
    ? 3.0 * smallMult
    : ltMedSmall
    ? 3.0 * medSmallMult
    : ltMedium
    ? 3.0 * mediumMult
    : 3.0;
  const rightLength = ltSmall
    ? 2.0 * smallMult
    : ltMedSmall
    ? 2.0 * medSmallMult
    : ltMedium
    ? 2.0 * mediumMult
    : 2.0;

  const rightMost = ltSmall
    ? 3.6 * smallMult
    : ltMedSmall
    ? 3.6 * medSmallMult
    : ltMedium
    ? 3.6 * mediumMult
    : 3.6;

  return (
    <div ref={scope} className="relative pv-25">
      <Rectangle className="hidden" size={hiddenSize} color={COLORS.accent} />

      <div
        style={{
          width: "110vw",
          top: 0,
          left: "-3vw",
        }}
        className="absolute-fill"
      >
        <ShrinkClick
          disabled={isAnimating}
          stayActive
          to={0.98}
          duration={1}
          clickable
          onPress={onAnimatedPress}
          className="width height flex center relative"
        >
          <motion.div className="flex column left-left-images z-1">
            <AboutImage
              base={leftMostBase}
              length={leftMostLength}
              src={images[0]}
              className={`mb-${margin}`}
            />
            <AboutImage
              base={leftMostBase}
              length={leftMostLength}
              src={images[1]}
            />
          </motion.div>

          <motion.div className={`flex column mh-${margin} left-images z-1`}>
            <AboutImage
              base={leftBase}
              length={leftLength}
              src={images[2]}
              className={`mb-${margin}`}
            />
            <AboutImage base={leftBase} length={leftBase} src={images[3]} />
          </motion.div>

          <AboutImage
            base={middle}
            length={middle}
            src={images[4]}
            className="middle-image z-2"
          />

          <motion.div className={`flex column mh-${margin} right-images z-1`}>
            <AboutImage
              base={rightBase}
              length={rightLength}
              src={images[5]}
              className={`mb-${margin}`}
            />
            <AboutImage base={rightBase} length={rightLength} src={images[6]} />
          </motion.div>

          <motion.div className="flex column right-right-images z-0">
            <AboutImage base={rightMost} length={rightMost} src={images[7]} />
          </motion.div>
        </ShrinkClick>
      </div>

      {/* <div
        style={{
          transform: transformStyle,
        }}
        className="absolute-fill bg-orange"
      >
        <ShrinkClick
          disabled={isAnimating}
          stayActive
          to={0.98}
          duration={1}
          clickable
          onPress={onAnimatedPress}
          style={{
            overflowX: "visible",
            overflowY: "visible",
          }}
          className="absolute-fill"
        >
          <motion.div
            style={{
              overflowY: "visible",
            }}
            className="parent-container flex relative pv-25"
          >
            <motion.div style={{}} className="flex center">
              {/* Left Most Two 
              <motion.div className="flex column left-left-images z-1">
                <HoverGrow stayActive clickable={false}>
                  <Rectangle base={leftMostBase} length={leftMostLength}>
                    <img
                      src={images[0]}
                      alt=""
                      className="img-cover width height"
                    />
                  </Rectangle>
                </HoverGrow>
                <div className="mv-10"></div>
                <HoverGrow stayActive clickable={false}>
                  <Rectangle base={leftMostBase} length={leftMostLength}>
                    <img
                      src={images[1]}
                      alt=""
                      className="img-cover width height"
                    />
                  </Rectangle>
                </HoverGrow>
              </motion.div>
              {/* Left Middle Two 
              <motion.div {`lassName="flex column mh-${margin} left-images z-1`}>
                <HoverGrow stayActive clickable={false}>
                  <Rectangle base={leftBase} length={leftLength}>
                    <img
                      src={images[2]}
                      alt=""
                      className="img-cover width height"
                    />
                  </Rectangle>
                </HoverGrow>
                <div className="mv-10"></div>
                <HoverGrow stayActive clickable={false}>
                  <Rectangle base={leftBase} length={leftBase}>
                    <img
                      src={images[3]}
                      alt=""
                      className="img-cover width height"
                    />
                  </Rectangle>
                </HoverGrow>
              </motion.div>
              {/* Middle Image 
              <HoverGrow
                className="middle-image z-2"
                stayActive
                clickable={false}
              >
                <Rectangle base={middle} length={middle} color={COLORS.primary}>
                  <img
                    src={images[4]}
                    alt=""
                    className="img-cover width height"
                  />
                </Rectangle>
              </HoverGrow>
              {/* Right Middle Two 
              <motion.div {`lassName="flex column mh-${margin} right-images z-1`}>
                <HoverGrow stayActive clickable={false}>
                  <Rectangle base={rightBase} length={rightLength}>
                    <img
                      src={images[5]}
                      alt=""
                      className="img-cover width height"
                    />
                  </Rectangle>
                </HoverGrow>
                <div className="mv-10"></div>
                <HoverGrow stayActive clickable={false}>
                  <Rectangle base={rightBase} length={rightLength}>
                    <img
                      style={{ objectPosition: "0px -50px" }}
                      src={images[6]}
                      alt=""
                      className="img-cover width height"
                    />
                  </Rectangle>
                </HoverGrow>
              </motion.div>
              {/* Right Most  
              <motion.div className="flex column right-right-images z-0">
                <HoverGrow stayActive clickable={false}>
                  <Rectangle base={rightMost} length={rightMost}>
                    <img
                      // style={{}}
                      src={images[7]}
                      alt=""
                      className="img-cover width height"
                    />
                  </Rectangle>
                </HoverGrow>
              </motion.div>
            </motion.div>
          </motion.div>
        </ShrinkClick>
      </div> */}
    </div>
  );
};
