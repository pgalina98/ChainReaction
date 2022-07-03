import { Variants } from "framer-motion";

interface FadeInOutLeftProps {
  duration?: number;
  delay?: number;
}

const useFadeInOutLeft = ({ duration = 0.5, delay = 0 }: FadeInOutLeftProps): Variants => {
  return {
    initial: { opacity: 0, translateX: "-100%" },
    animate: {
      opacity: 1,
      translateX: 0,
      transition: { duration, delay },
    },
    exit: {
      width: "150vw",
      transition: { duration },
    },
  };
};

export default useFadeInOutLeft;
