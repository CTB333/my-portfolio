import React, { useEffect } from "react";

export const useScrollToTop = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };
};
