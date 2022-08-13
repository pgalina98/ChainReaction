import { Variants } from "framer-motion";

interface UseLazyLoadCardProps {
  isLoading?: boolean;
}

const useLazyLoadImage = ({
  isLoading = true,
}: UseLazyLoadCardProps): Variants => {
  return {
    initial: { height: "16rem", opacity: 0 },
    animate: {
      height: isLoading ? "16rem" : "auto",
      opacity: isLoading ? 0 : 1,
    },
    transition: {
      height: "delay: 0, duration: 0.4",
      opacity: "delay: 0.5, duration: 0.4",
    },
  };
};

export default useLazyLoadImage;
