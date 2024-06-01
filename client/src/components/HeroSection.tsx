import { ReactNode } from "react";
import { useScreenSize } from "../providers";

type HeroSectionProps = {
  left?: ReactNode;
  right?: ReactNode;
};

export const HeroSection = ({ left, right }: HeroSectionProps) => {
  const { ltMedium, ltSmall } = useScreenSize();

  const maxWidth = "800px";
  const minWidth = "710px";

  return (
    <div
      style={{ minHeight: "80vh" }}
      className={`relative flex center bg-secondary  p-100 pb-50 ${
        ltMedium ? "column" : "row"
      }`}
    >
      <div
        // style={{ maxWidth, minWidth }}
        className={`flex-1 ${ltMedium && right ? "mb-25" : "mr-25"}`}
      >
        {left}
      </div>
      <div
        // style={{ maxWidth, minWidth }}
        className={`flex-1 ${ltMedium && right ? "mt-25" : "ml-25"}`}
      >
        {right}
      </div>
    </div>
  );
};
