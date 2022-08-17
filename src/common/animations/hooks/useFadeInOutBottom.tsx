import { Variants } from "framer-motion";

interface FadeInOutBottomProps {
  duration?: number;
  delay?: number;
}

const useFadeInOutBottom = ({
  duration = 0.5,
  delay = 0,
}: FadeInOutBottomProps): Variants => {
  return {
    initial: { opacity: 0, translateY: "110%" },
    animate: {
      opacity: 1,
      translateY: 0,
      transition: { duration, delay },
    },
    exit: {
      translateY: "110%",
      transition: { duration },
    },
  };
};

export default useFadeInOutBottom;
