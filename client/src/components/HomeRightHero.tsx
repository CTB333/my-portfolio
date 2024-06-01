import React from "react";
import { HoverGrow, ShrinkClick } from "./common_animations";
import { HomeHeroImage } from "./HomeHeroImage";
import { HashLink } from "react-router-hash-link";

export const HomeRightHero = () => {
  return (
    <div className="width height flex center">
      <HashLink className="link" smooth to={"/#Projects"}>
        <ShrinkClick to={0.95}>
          <HoverGrow stayActive>
            <HomeHeroImage />
          </HoverGrow>
        </ShrinkClick>
      </HashLink>
    </div>
  );
};
