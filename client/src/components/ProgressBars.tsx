import React from "react";
import { ProgressBar, ProgressBarProps } from "./ProgressBar";
import { useScreenSize } from "../providers";

type ProgressBarsProps = {
  title: string;
  bars: ProgressBarProps[];
};

export const ProgressBars = ({ title, bars }: ProgressBarsProps) => {
  const { ltSmall } = useScreenSize();
  return (
    <div className="">
      <div className="flex center mb-50">
        <p className="fs-2 bold text-center">{title}</p>
      </div>

      <div className=" flex center column ph-15">
        <div
          style={{
            width: ltSmall ? "100%" : "75%",
          }}
        >
          {bars.map((props) => (
            <ProgressBar key={props.title} {...props} />
          ))}
        </div>
      </div>
    </div>
  );
};
