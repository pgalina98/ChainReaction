import { Variants } from "framer-motion";

interface FadeInOutRightProps {
  duration?: number;
  delay?: number;
}

const useFadeInOutRight = ({ duration = 0.5, delay = 0 }: FadeInOutRightProps): Variants => {
  return {
    initial: { opacity: 0, x: "105vw" },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration, delay },
    },
    exit: {
      width: "100vw",
      transition: { duration },
    },
  };
};

export default useFadeInOutRight;
