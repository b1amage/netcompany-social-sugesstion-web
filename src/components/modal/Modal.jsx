import useOnClickOutside from "@/hooks/useOnClickOutside";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, onClose);

  return createPortal(
    <div className="absolute inset-0 bg-black/50 backdrop-blur-md top-0 z-[100] ">
      <div
        ref={modalRef}
        className="absolute inset-30 right-0 left-0 bottom-0 z-[200] p-10 bg-white h-[80vh] rounded-t-2xl"
      >
        {children}
      </div>
    </div>,
    document.querySelector(".popup-notification")
  );
};

export default Modal;
