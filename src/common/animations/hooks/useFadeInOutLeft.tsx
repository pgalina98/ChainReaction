import { Variant, Variants } from "framer-motion";

interface FadeInOutLeftProps {
  duration?: number;
  delay?: number;
  exit?: Variant;
}

const useFadeInOutLeft = ({
  duration = 0.5,
  delay = 0,
  exit = { width: "150vw" },
}: FadeInOutLeftProps): Variants => {
  return {
    initial: { opacity: 0, translateX: "-110%" },
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

export default useFadeInOutLeft;
