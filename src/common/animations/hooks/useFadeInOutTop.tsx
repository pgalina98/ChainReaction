import { Variants } from "framer-motion";

interface FadeInOutTopProps {
  duration?: number;
  delay?: number;
}

const useFadeInOutTop = ({ duration = 0.5, delay = 0 }: FadeInOutTopProps): Variants => {
  return {
    initial: { opacity: 0, translateY: "-110%" },
    animate: {
      opacity: 1,
      translateY: 0,
      transition: { duration, delay },
    },
    exit: {
      translateY: "-110%",
      transition: { duration },
    },
  };
};

export default useFadeInOutTop;
