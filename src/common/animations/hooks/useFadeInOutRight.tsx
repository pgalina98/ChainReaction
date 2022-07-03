import { Variants } from "framer-motion";

interface FadeInOutRightProps {
  duration?: number;
  delay?: number;
}

const useFadeInOutRight = ({ duration = 0.5, delay = 0 }: FadeInOutRightProps): Variants => {
  return {
    initial: { opacity: 0, translateX: "110%" },
    animate: {
      opacity: 1,
      translateX: 0,
      transition: { duration, delay },
    },
    exit: {
      translateX: "110%",
      transition: { duration },
    },
  };
};

export default useFadeInOutRight;
