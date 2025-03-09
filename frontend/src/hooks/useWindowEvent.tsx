import { useCallback, useEffect } from "react";

export function useWindowEvent<K extends keyof WindowEventMap>(
  event: K,
  callback: (e: WindowEventMap[K]) => void
) {
  const handleEvent = useCallback((e: WindowEventMap[K]) => {
    if (e instanceof KeyboardEvent && event === "keydown") {
      if (!e.repeat) {
        callback(e);
      }
    } else {
      callback(e);
    }
  }, [event, callback]);

  useEffect(() => {
    window.addEventListener(event, handleEvent);
    return () => window.removeEventListener(event, handleEvent);
  }, [event, handleEvent]);
}
