import EVENTS from "@/constants/events";
import { useState, useEffect } from "react";

const useScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener(EVENTS.RESIZE, handleWindowResize);
    return () => window.removeEventListener(EVENTS.RESIZE, handleWindowResize);
  }, []);

  return { width };
};

export default useScreenWidth;
