import { Variants } from "framer-motion";

const useRotateAndScale = (): Variants => {
  return {
    animate: {
      scale: [1, 2, 2, 2, 1],
      rotate: [0, 0, 360, 360, 0],
      borderRadius: ["25%", "25%", "50%", "50%", "50%"],
    },
    exit: {
      scale: [1, 2, 2, 2, 1],
      rotate: [0, 0, 360, 360, 0],
      borderRadius: ["25%", "25%", "50%", "50%", "50%"],
    },
  };
};

export default useRotateAndScale;
