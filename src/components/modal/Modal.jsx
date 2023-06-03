import useOnClickOutside from "@/hooks/useOnClickOutside";
import Heading from "@/components/typography/Heading";
import React, { useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose, className, popupClassName, heading }) => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, onClose);

  return createPortal(
    <div className={`absolute flex items-end lg:justify-center lg:items-center inset-0 bg-black/50 backdrop-blur-md top-0 z-[100] ${className}`}>
      <div
        ref={modalRef}
        className={`${popupClassName} w-full p-10 bg-white h-[80vh] rounded-t-2xl lg:rounded-lg lg:w-fit lg:h-fit`}
      >
        <Heading className='!text-[32px] text-center'>{heading}</Heading>
        {children}
      </div>
    </div>,
    document.querySelector(".popup-notification")
  );
};

export default Modal;
