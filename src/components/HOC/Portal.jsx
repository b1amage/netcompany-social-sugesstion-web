import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children, location = "body" }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector(location))
    : null;
};

export default Portal;