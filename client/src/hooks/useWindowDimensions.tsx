import { useEffect, useState } from "react";

export function useWindowDimensions() {
  const [dimension, setDimension] = useState([
    document.body.clientWidth,
    document.body.clientHeight,
  ]);

  useEffect(() => {
    const debouncedResizeHandler = debounce(() => {
      setDimension([document.body.clientWidth, document.body.clientHeight]);
    }, 100); // 100m

    const ro = new ResizeObserver(debouncedResizeHandler);

    ro.observe(document.body.querySelector("#root")!);

    return () => {
      ro.unobserve(document.body.querySelector("#root")!);
    };
  }, []);

  return dimension;
}
const debounce = (
  fn: (...params: any[]) => any,
  n: number,
  immed: boolean = false
) => {
  let timer: NodeJS.Timeout | number | undefined = undefined;
  return function (this: any, ...args: any[]) {
    if (timer === undefined && immed) {
      fn.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), n);
    return timer;
  };
};
