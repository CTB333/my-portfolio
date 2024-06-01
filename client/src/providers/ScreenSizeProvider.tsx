import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useWindowDimensions } from "../hooks";

type ScreenSizeProviderProps = {
  children?: ReactNode;
};

type ScreenSizeContextType = {
  size: "xsmall" | "small" | "med-small" | "medium" | "large" | "xlarge";
  width: number;
};

const ScreenSizeContext = createContext<ScreenSizeContextType>({
  size: "small",
  width: 0,
});

export const useScreenSize = () => {
  const { size, width } = useContext(ScreenSizeContext);

  const isXSmall = size === "xsmall";
  const isSmall = size === "small";
  const isMedSmall = size === "med-small";
  const isMedium = size === "medium";
  const isLarge = size === "large";
  const isXLarge = size === "xlarge";

  const gtLarge = isLarge || isXLarge;
  const gtMedium = isMedium || gtLarge;
  const gtMedSmall = isMedSmall || gtMedium;
  const gtSmall = isSmall || gtMedium;

  const ltSmall = isXSmall || isSmall;
  const ltMedSmall = isMedSmall || ltSmall;
  const ltMedium = isMedium || ltMedSmall;
  const ltLarge = isLarge || ltMedium;

  return {
    size,
    width,
    isXSmall,
    isSmall,
    isMedSmall,
    isMedium,
    isLarge,
    isXLarge,

    allMedium: isMedSmall || isMedium,

    gtLarge,
    gtMedium,
    gtMedSmall,
    gtSmall,

    ltSmall,
    ltMedSmall,
    ltMedium,
    ltLarge,
  };
};

export const ScreenSizeProvider = ({ children }: ScreenSizeProviderProps) => {
  const [size, setSize] = useState<ScreenSizeContextType["size"]>("large");

  const [width] = useWindowDimensions();

  const init = useCallback(() => {
    if (width >= 1728) return setSize("xlarge");

    if (width >= 1300) return setSize("large");

    if (width >= 1000) return setSize("medium");

    if (width >= 700) return setSize("med-small");

    if (width >= 400) return setSize("small");

    setSize("xsmall");
  }, [width]);

  useEffect(() => {
    init();
  }, [init, width]);

  const value = {
    size,
    width,
  };
  return (
    <div
      // onResize={(e) => {
      //   console.log(`Resizing`);
      // }}
      className="bg-orange page"
    >
      <ScreenSizeContext.Provider value={value}>
        {children}
      </ScreenSizeContext.Provider>
    </div>
  );
};
