import React from "react";
import { useScreenSize } from "../providers";
import { TextButton } from "../components";
import { COLORS } from "../constants";

export const NotFoundPage = () => {
  const { ltMedSmall, ltSmall } = useScreenSize();

  return (
    <div
      className={`pb-100 bg-secondary pv-50 ${
        ltMedSmall ? "ph-15" : "ph-150"
      }  flex`}
    >
      <div
        className={`rad-20 p-25 bg-primary flex-1 flex center column color-secondary ${
          ltSmall ? "ph-10" : "ph-50"
        }`}
      >
        <p className="fs-1 font-2 mb-50">Sorry, Page not found</p>

        <TextButton
          text="Back to Home"
          bold
          buttonColor={COLORS.accent}
          color={COLORS.primary}
        />
      </div>
    </div>
  );
};
