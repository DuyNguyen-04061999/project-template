import { useEffect } from "react";

const useScrollTop = (dependencyList = []) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [...dependencyList]);
};

export default useScrollTop;
