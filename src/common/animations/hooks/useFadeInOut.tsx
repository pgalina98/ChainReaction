import { Variants } from "framer-motion";

interface FadeInOutProps {
  duration?: number;
  delay?: number;
}

const useFadeInOut = ({ duration = 0.5, delay = 0 }: FadeInOutProps): Variants => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration, delay } },
    exit: { opacity: 0 },
  };
};

export default useFadeInOut;
