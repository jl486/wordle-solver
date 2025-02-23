import { useEffect } from "react";

export function useWindowEvent<K extends keyof WindowEventMap>(
  event: K, 
  callback: (e: WindowEventMap[K]) => void
) {
  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  }, [event, callback]);
}
