import { Variants } from "framer-motion";

const useDisplayNoneOnExit = (): Variants => {
  return {
    exit: {
      display: "none",
    },
  };
};

export default useDisplayNoneOnExit;
