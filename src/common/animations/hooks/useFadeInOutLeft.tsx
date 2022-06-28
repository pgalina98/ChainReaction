import { Variants } from "framer-motion";

interface FadeInOutLeftProps {
  duration?: number;
  delay?: number;
}

const useFadeInOutLeft = ({
  duration = 0.5,
  delay = 0,
}: FadeInOutLeftProps): Variants => {
  return {
    initial: { opacity: 0, x: "-100%" },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration, delay },
    },
  };
};

export default useFadeInOutLeft;
