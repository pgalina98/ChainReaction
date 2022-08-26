import { useEffect, useRef, useState } from "react";

import type { LottiePlayer } from "lottie-web";

import styles from "./delivery-overlay.module.scss";

interface DeliveryOverlayProps {
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
        path: "/animations/package-delivery.json",
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return (
    <div
      ref={ref}
      className={`${styles.icon_height} absolute -left-20 -bottom-4`}
    />
  );
};

const DeliveryOverlay = ({ className }: DeliveryOverlayProps) => {
  return (
    <div className={`h-screen ${className} bg_primary relative`}>
      <Animation />
    </div>
  );
};

export default DeliveryOverlay;
