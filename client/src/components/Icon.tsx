import React from "react";

import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";
import { COLORS } from "../constants";
import { IMAGES } from "../assets";

export type PackageIconProps = {
  color: string;
  size: number;
};

const PackageIcons = {
  doubleUp: (props: PackageIconProps) => (
    <MdOutlineKeyboardDoubleArrowUp {...props} />
  ),
  starFilled: (props: PackageIconProps) => <FaStar {...props} />,
  starHalf: (props: PackageIconProps) => <FaRegStarHalfStroke {...props} />,
  starOutline: (props: PackageIconProps) => <FaRegStar {...props} />,
  insta: (props: PackageIconProps) => (
    <div style={{ width: props.size, height: props.size }}>
      <img
        alt="Ts"
        className="width height img-contain"
        src={IMAGES.IconInsta}
      />
    </div>
  ),
  linkedIn: (props: PackageIconProps) => (
    <div style={{ width: props.size, height: props.size }}>
      <img
        alt="Ts"
        className="width height img-contain"
        src={IMAGES.IconLinkedIn}
      />
    </div>
  ),
  github: (props: PackageIconProps) => (
    <div style={{ width: props.size, height: props.size }}>
      <img
        alt="Ts"
        className="width height img-contain bg-primary rad-50"
        src={IMAGES.IconGithub}
      />
    </div>
  ),
};

export type IconProps = Partial<PackageIconProps> & {
  name: keyof typeof PackageIcons;
};

export const Icon = ({ name, color, size }: IconProps) => {
  const PackageIcon = PackageIcons[name];
  return (
    <PackageIcon color={color ?? COLORS.primary} size={size ? size * 32 : 32} />
  );
};
