import Portal from "@/components/HOC/Portal";
import Heading from "@/components/typography/Heading";
import Wrapper from "@/components/wrapper/Wrapper";
import Button from "@/components/button/Button";
import React, { useRef } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import generateId from "@/utilities/generateId";

// actions: [
//     {
//       title: "delete",
//       danger: true,
//       action: () => {},
//     },
//     { title: "cancel", danger: false, action: () => {} },
//   ]
const Popup = ({
  title,
  onClose,
  className,
  actions = [
    {
      title: "delete",
      danger: true,
      action: () => {},
    },
    { title: "cancel", danger: false, action: () => {} },
  ],
}) => {
  const popupRef = useRef();
  useOnClickOutside(popupRef, onClose);
  return (
    <Portal location="body">
      <Wrapper className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md z-[9999] flex-center">
        <Wrapper
          _ref={popupRef}
          col="true"
          className="w-[300px] h-[200px] md:w-[400px] md:h-[220px] bg-white  drop-shadow-lg rounded-xl p-5 md:p-10 lg:w-[450px] lg:h-[250px]"
        >
          <Heading className="text-center">{title}</Heading>
          <Wrapper className="justify-between mt-auto !py-0">
            {actions.length > 0 &&
              actions.map((item) => (
                <Button
                  onClick={() => item.action()}
                  key={generateId()}
                  className={`w-1/2 my-0 capitalize ${
                    item.danger && "bg-danger"
                  }`}
                  active={!item.danger}
                >
                  {item.title}
                </Button>
              ))}
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Portal>
  );
};

export default Popup;
