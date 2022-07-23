import { useEffect, useRef, useState } from "react";

import type { LottiePlayer } from "lottie-web";

import styles from "./loading-overlay.module.scss";

interface LoadingOverlayProps {
  className?: string;
}

export const Animation = () => {
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
        path: "animations/loading-cart.json",
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return <div ref={ref} className={styles.icon_height} />;
};

const LoadingOverlay = ({ className }: LoadingOverlayProps) => {
  return (
    <div className={`h-screen ${className} bg_primary flex items-center justify-center`}>
      <Animation />
    </div>
  );
};

export default LoadingOverlay;
