import { MotionStyle, motion } from "framer-motion";

import { HoverGrow } from "../common_animations";
import { Rectangle } from "./Rectangle";
import { Circle } from "./Circle";
import { Triangle, TriangleProps } from "./Triangle";

export type TransformBox = MotionStyle;

type ShapeImageProps = Omit<
  Omit<Omit<TriangleProps, "styles">, "className">,
  "children"
> & {
  shape?: "Rectangle" | "Triangle" | "Circle";
  // rotation?: TriangleProps["rotation"];
  animation?: TransformBox;
  animationClass?: string;
  id?: string;
  size?: number;
  src?: string;
  color?: string;
  clickable?: boolean;
  blur?: boolean;
  cancel?: boolean;
  alt?: string;
  imgStyle?: React.CSSProperties;
};

export const ShapeImage = ({
  shape = "Rectangle",
  rotation,
  id,
  animation = {},
  animationClass = "",
  size = 2,
  src,
  color,
  clickable,
  blur = false,
  alt = "",
  cancel = false,
  imgStyle = {},
  base,
  length,
}: ShapeImageProps) => {
  const Shape =
    shape === "Rectangle" ? Rectangle : shape === "Circle" ? Circle : Triangle;

  return (
    <div className="absolute-fill flex center no-click">
      <motion.div
        id={id}
        className={"all-click animated-shape " + animationClass}
        style={cancel ? {} : { ...animation }}
      >
        <HoverGrow clickable={clickable}>
          <Shape
            className="shadow"
            styles={{ overflow: "hidden" }}
            size={size}
            color={color}
            rotation={rotation}
            base={base}
            length={length}
          >
            <img
              style={{ filter: blur ? "blur(2px)" : undefined, ...imgStyle }}
              className="width height img-cover"
              src={src}
              alt={alt}
            />
          </Shape>
        </HoverGrow>
      </motion.div>
    </div>
  );
};
