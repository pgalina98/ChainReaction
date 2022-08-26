import { useEffect, useRef, useState } from "react";

import type { LottiePlayer } from "lottie-web";

interface DeliveryInProgressProps {
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
        path: "/animations/delivery-in-progress.json",
      });

      return () => animation.destroy();
    }
  }, [lottie]);

  return <div ref={ref} />;
};

const DeliveryInProgress = ({ className }: DeliveryInProgressProps) => {
  return (
    <div className={`${className}`}>
      <Animation />
    </div>
  );
};

export default DeliveryInProgress;
