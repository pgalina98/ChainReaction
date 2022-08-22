import { useEffect, useRef } from "react";

const useDidMountEffect = (callback: any, dependencyList: any) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) didMount.current = true;
    else callback();
  }, [...dependencyList]);
};

export default useDidMountEffect;
