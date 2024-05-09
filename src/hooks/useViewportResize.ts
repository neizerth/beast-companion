import {useEffect} from "react";

export const useViewportResize = (onResize: () => void) => {
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);
}