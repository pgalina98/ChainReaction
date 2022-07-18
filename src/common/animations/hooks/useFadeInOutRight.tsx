import { Variant, Variants } from "framer-motion";

interface FadeInOutRightProps {
  duration?: number;
  delay?: number;
  exit?: Variant;
}

const useFadeInOutRight = ({
  duration = 0.5,
  delay = 0,
  exit = { translateX: "110%" },
}: FadeInOutRightProps): Variants => {
  return {
    initial: { opacity: 0, translateX: "110%" },
    animate: {
      opacity: 1,
      translateX: 0,
      transition: { duration, delay },
    },
    exit: {
      ...exit,
      transition: { duration },
    },
  };
};

export default useFadeInOutRight;
