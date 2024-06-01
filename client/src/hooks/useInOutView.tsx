import { UseInViewOptions, useInView } from "framer-motion";
import { RefObject, useEffect, useState } from "react";
import { useVerticalDirection } from "./useVerticalDirection";

type InOutViewOptions = UseInViewOptions & {
  in?: UseInViewOptions["amount"];
  out?: UseInViewOptions["amount"];
};

export const useInOutView = (
  ref: RefObject<HTMLElement>,
  options: InOutViewOptions = { in: 0.5, out: "all" }
) => {
  const [isInView, setIsInView] = useState(false);
  const direction = useVerticalDirection(ref);

  const originalInView = useInView(ref, {
    amount: options.in,
  });

  const originalOutView = useInView(ref, {
    amount: options.out,
  });

  // useEffect(())

  useEffect(() => {
    const calculate = () => {
      if (originalInView && !originalOutView) {
        return setIsInView(true);
      }

      if (!originalInView && !originalOutView) {
        return setIsInView(false);
      }
    };

    calculate();
  }, [direction, originalInView, originalOutView]);

  return isInView;
};
