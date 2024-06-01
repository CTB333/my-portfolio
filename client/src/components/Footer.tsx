import React from "react";
import { Icon } from "./Icon";
import { motion } from "framer-motion";
import { HoverGrow, ShrinkClick } from "./common_animations";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "../providers";

type LinkProps = {
  margin?: boolean;
  text: string;
  onPress?: () => void;
};

const Link = ({ margin = true, text, onPress }: LinkProps) => {
  const { ltSmall } = useScreenSize();

  return (
    <HoverGrow onPress={onPress} stayActive>
      <motion.p
        initial={{ fontWeight: "normal" }}
        whileHover={{ fontWeight: "bold" }}
        transition={{ duration: 0.5 }}
        className={`color-primary ${margin ? "mb-50" : ""} ${
          ltSmall ? "text-center" : ""
        }`}
      >
        {text}
      </motion.p>
    </HoverGrow>
  );
};

export const Footer = () => {
  const navigate = useNavigate();

  const toInstagram = () => {
    const newWindow = window.open(
      "https://www.instagram.com/ctb_716/",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  const toLinkedIn = () => {
    const newWindow = window.open(
      "https://www.linkedin.com/in/colin-tondreau101/",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  const toGitHub = () => {
    const newWindow = window.open(
      "https://github.com/CTB333?tab=repositories",
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  const { ltSmall, gtMedSmall } = useScreenSize();

  return (
    <div
      className={`bg-secondary ph-${ltSmall ? 50 : 100} pb-${
        ltSmall ? 50 : 100
      }`}
    >
      <div className="bg-primary p-5 width mb-100" />

      <div className={`flex ${ltSmall ? "column" : "row"} center`}>
        <div
          style={{ minWidth: "10%" }}
          className={`flex column height ${ltSmall ? "mb-50" : "mr-50"}`}
        >
          <Link onPress={() => navigate("/")} text="Home" />
          <Link onPress={() => navigate("/about")} text="About" />
          <Link onPress={() => navigate("/resume")} text="Resume" />
          <Link
            margin={false}
            onPress={() => navigate("/contact")}
            text="Contact"
          />
        </div>
        <div
          className={`flex ${ltSmall ? "row" : "column"} ${
            ltSmall ? "mt-20" : "ml-50"
          }`}
        >
          <ShrinkClick onPress={toInstagram}>
            <HoverGrow stayActive>
              <Icon size={2} name="insta" />
            </HoverGrow>
          </ShrinkClick>
          {gtMedSmall ? (
            <div className="mv-50"></div>
          ) : (
            <div className="mh-25" />
          )}
          <ShrinkClick onPress={toGitHub}>
            <HoverGrow stayActive>
              <Icon size={2} name="github" />
            </HoverGrow>
          </ShrinkClick>
          {gtMedSmall ? (
            <div className="mv-50"></div>
          ) : (
            <div className="mh-25" />
          )}
          <ShrinkClick onPress={toLinkedIn}>
            <HoverGrow stayActive>
              <Icon size={2} name="linkedIn" />
            </HoverGrow>
          </ShrinkClick>
        </div>
      </div>
    </div>
  );
};
