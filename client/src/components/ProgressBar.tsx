import { motion } from "framer-motion";
import { ImgHTMLAttributes } from "react";
import { HoverGrow } from "./common_animations";
import { Icon, IconProps } from "./Icon";
import { COLORS } from "../constants";
import { useScaleEntrance } from "../hooks";
import { StarRow } from "./StarRow";
import { useScreenSize } from "../providers";

export type ProgressBarProps = {
  icon?: IconProps["name"];
  src?: ImgHTMLAttributes<HTMLImageElement>["src"];
  filled?: number;
  title: string;
};

export const ProgressBar = ({
  src,
  title,
  filled = 1.5,
  icon,
}: ProgressBarProps) => {
  const { scope, animationRunning } = useScaleEntrance(".progress-bar");
  const { ltMedium, ltSmall } = useScreenSize();

  return (
    <div ref={scope} className="relative width mb-50">
      <HoverGrow
        disabled={animationRunning}
        className="hover-bold progress-bar"
        stayActive
        clickable={false}
      >
        <motion.div
          className={`p-15  shadow flex ${
            ltMedium ? "column ai-start" : "row space ph-25"
          } bg-primary rad-15 color-secondary`}
        >
          <div className={"flex row center jc-start"}>
            <div style={{ width: 32, height: 32 }} className="mr-25">
              {src ? (
                <img
                  alt={title}
                  className="width height img-contain"
                  src={src}
                />
              ) : null}
              {icon ? (
                <Icon size={1} name={icon} color={COLORS.secondary} />
              ) : null}
            </div>
            <p className={ltSmall ? "" : "fs-3"}>{title}</p>
          </div>

          <StarRow filled={filled} />
        </motion.div>
      </HoverGrow>
    </div>
  );
};
