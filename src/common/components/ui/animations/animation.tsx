import { useEffect, useRef, useState } from "react";

import { LottiePlayer } from "lottie-web";

import styles from "./animation.module.scss";

interface AnimationProps {
  className?: string;
  styles?: string;
  animationPath: string;
}

const Animation = ({ className, animationPath }: AnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [lottie, setLottie] = useState<LottiePlayer | null>(null);

  useEffect(() => {
    import("lottie-web").then((Lottie) => setLottie(Lottie.default));
  }, []);

  useEffect(() => {
    if (lottie && ref.current) {
      const animation = lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationPath,
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return <div ref={ref} className={`${className} ${styles}.${styles}`} />;
};

export default Animation;
