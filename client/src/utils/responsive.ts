import { CSSProperties } from "react";

const DeviceWidths = {
  iphone5: 320,
  iphoneSE: 375,
  iphone12: 390,
  iphoneXR: 414,
  iphone14Max: 430,
  iPadVertical: 768,
  iPadHorizontal: 1138,
  iPadAirVertical: 911,
  iPadAirHorizontal: 1311,
  iPadProHorizontal: 1518,
};

type ResponsiveOptions<T> = {
  iphone5?: T;
  iphoneSE?: T;
  iphone12?: T;
  iphoneXR?: T;
  iphone14Max?: T;
  iPadVertical?: T;
  iPadAirVertical?: T;
  iPadAirHorizontal?: T;
  iPadHorizontal?: T;
  iPadProHorizontal?: T;

  otherwise?: T;
};

const getKey = (width: number): keyof typeof DeviceWidths | "otherwise" => {
  for (let key in DeviceWidths) {
    if (DeviceWidths[key as keyof typeof DeviceWidths] === width)
      return key as keyof typeof DeviceWidths;
  }
  return "otherwise";
};

export const responsiveString = (
  width: number,
  base: string = "",
  responsiveOptions?: ResponsiveOptions<string>
) => {
  const key = getKey(width);

  if (!responsiveOptions) return base;

  const value = responsiveOptions[key as keyof typeof responsiveOptions];

  if (base.length === 0 && value) return value;

  const response = base && value ? base + " " + value : "";
  return response.trim();
};

export const responsiveStyle = (
  width: number,
  base: CSSProperties = {},
  responsiveOptions?: ResponsiveOptions<CSSProperties>
) => {
  const key = getKey(width);

  if (!responsiveOptions) return base;

  const value = responsiveOptions[key as keyof typeof responsiveOptions];

  return {
    ...base,
    ...value,
  };
};

export const responsiveNumber = (
  width: number,
  base: number = 0,
  responsiveOptions?: ResponsiveOptions<number>
) => {
  const key = getKey(width);

  if (!responsiveOptions) return base;

  const value = responsiveOptions[key as keyof typeof responsiveOptions];

  if (value !== undefined) return value;

  return base;
};
