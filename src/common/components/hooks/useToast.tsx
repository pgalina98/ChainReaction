import { useEffect, useRef, useState } from "react";

interface useToastProps {
  duration?: number;
}

export const useToast = ({ duration = 2000 }: useToastProps): [boolean, any] => {
  const firstRender = useRef(true);

  const [isShown, setIsShown] = useState<boolean>(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setIsShown(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [isShown]);

  return [isShown, setIsShown];
};
