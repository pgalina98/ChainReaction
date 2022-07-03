import { TargetAndTransition, VariantLabels } from "framer-motion";

interface BounceProps {
  repeat?: number;
}

const useFadeInOut = ({ repeat = Infinity }: BounceProps): VariantLabels | TargetAndTransition => {
  return {
    x: [-5, 5, -5],
    transition: { repeat },
  };
};

export default useFadeInOut;
