import { Variant, Variants } from "framer-motion";

interface FadeInOutProps {
  duration?: number;
  delay?: number;
  exit?: Variant;
}

const useFadeInOut = ({
  duration = 0.5,
  delay = 0,
  exit = { display: "none" },
}: FadeInOutProps): Variants => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration, delay } },
    exit,
  };
};

export default useFadeInOut;
