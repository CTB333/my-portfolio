import React from "react";
import { HoverGrow, ShrinkClick } from "./common_animations";
import {
  MotionStyle,
  motion,
  useAnimate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useScreenSize } from "../providers";

const useFooterAnimation = () => {
  const [scope] = useAnimate();

  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ["start end", "end end"],
  });

  const bgX = useTransform(scrollYProgress, [0.7, 0.9], ["-80%", "-15%"]);

  const backgroundStyle: MotionStyle = {
    x: bgX,
  };

  return { scope, backgroundStyle };
};

type HomeFooterCTAProps = {
  onPress?: () => void;
};

const HomeFooterCTA = ({ onPress }: HomeFooterCTAProps) => {
  const { scope, backgroundStyle } = useFooterAnimation();

  const maxWidth = "1750px";

  const { ltSmall } = useScreenSize();

  return (
    <div
      ref={scope}
      className={`relative flex center ${ltSmall ? "ph-10" : "ph-100"}  pb-100`}
    >
      <HoverGrow
        style={{ maxWidth }}
        onPress={onPress}
        stayActive
        className={ltSmall ? "flex-1" : "flex-1"}
      >
        <ShrinkClick>
          <div
            className={`bg-primary color-secondary rad-20 relative ${
              ltSmall ? "p-25" : "p-50"
            } flex-1 ov-hidden`}
          >
            <motion.div
              style={backgroundStyle}
              className="absolute-fill z-0 bg-accent"
            />
            <div className="flex center jc-start">
              <p
                className={`relative ov-hidden z-3 ${
                  ltSmall ? "fs-2" : "fs-1"
                } bold`}
              >
                Like these <br /> projects?
              </p>
            </div>
            <div className="mt-25"></div>
            <div className="flex center jc-end">
              <p
                className={`relative ov-hidden z-3 ${
                  ltSmall ? "fs-2" : "fs-1"
                } bold`}
              >
                Lets make <br /> yours!
              </p>
            </div>
          </div>
        </ShrinkClick>
      </HoverGrow>
    </div>
  );
};

export default HomeFooterCTA;
