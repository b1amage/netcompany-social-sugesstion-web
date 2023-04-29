import EVENTS from "@/constants/events";
import { useEffect } from "react";
const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener(EVENTS.MOUSE_DOWN, listener);
    document.addEventListener(EVENTS.TOUCH_START, listener);
    return () => {
      document.removeEventListener(EVENTS.MOUSE_DOWN, listener);
      document.removeEventListener(EVENTS.TOUCH_START, listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
