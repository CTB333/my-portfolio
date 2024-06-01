import React from "react";
import { TextButton } from "./buttons";
import { COLORS } from "../constants";
import { HashLink } from "react-router-hash-link";
import { useScreenSize } from "../providers";

type HomeLeftHeroProps = {
  toContact: () => void;
};

export const HomeLeftHero = ({ toContact }: HomeLeftHeroProps) => {
  const { ltSmall } = useScreenSize();

  return (
    <div className="flex column center width height">
      <p className={`${ltSmall ? "text-center" : ""} fs-2 color-primary bold`}>
        Elevating businesses with creative software solutions.
      </p>
      <p className={`${ltSmall ? "text-center" : ""} color-primary mv-15`}>
        Guided by a commitment to excellence I specialize in developing software
        solutions that perfectly align with your business goals.
      </p>

      <div className={`width flex column center ${ltSmall ? "" : "ai-start"} `}>
        <TextButton
          bold
          className={`${ltSmall ? "flex center text-center" : ""}`}
          text="Lets Get In Touch"
          size={3}
          color={COLORS.primary}
          buttonColor={COLORS.accent}
          onPress={toContact}
        />

        <HashLink className="mt-10 link" smooth to={"/#Projects"}>
          <TextButton
            className={`${ltSmall ? "flex center text-center" : ""}`}
            outline
            text="Prove it first"
            color={COLORS.primary}
            buttonColor={COLORS.primary}
          />
        </HashLink>
      </div>
    </div>
  );
};
