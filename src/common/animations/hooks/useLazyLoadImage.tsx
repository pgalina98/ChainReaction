import { Variants } from "framer-motion";

interface UseLazyLoadCardProps {
  isLoading?: boolean;
  duration?: number;
  delay?: number;
}

const useLazyLoadImage = ({
  isLoading = false,
  duration = 0.4,
  delay = 0.5,
}: UseLazyLoadCardProps): Variants => {
  return {
    initial: { height: "2rem", opacity: 0 },
    animate: {
      height: isLoading ? "2rem" : "auto",
      opacity: isLoading ? 0 : 1,
      transition: { duration, delay },
    },
  };
};

export default useLazyLoadImage;
