import Wrapper from "@/components/wrapper/Wrapper";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

const Select = ({ onChange, options }) => {
  const [showList, setShowList] = useState(false);
  const [current, setCurrent] = useState(options[0]);
  return (
    <div className="relative z-[100]">
      <Wrapper
        onClick={() => setShowList((prev) => !prev)}
        className="!w-full capitalize cursor-pointer min-w-[112px] flex-center !justify-start px-4 py-3 text-sm duration-300 border rounded-lg outline-none border-primary-400 focus:ring-1 focus:ring-primary-400 md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 text-overflow-ellipsis"
      >
        {current}
      </Wrapper>

      <AiFillCaretDown
        className="absolute -translate-y-1/2 right-2 top-1/2"
        onClick={() => setShowList((prev) => !prev)}
      />

      {showList && (
        <Wrapper
          col="true"
          className="absolute bottom-0 w-full p-3 translate-y-full bg-white rounded-md drop-shadow-lg"
        >
          {options.map((item) => (
            <Wrapper
              onClick={(e) => {
                if (e.target.id === current) {
                  setShowList(false);
                  return;
                }

                setCurrent(item);
                onChange(item);
                setShowList(false);
              }}
              key={item}
              id={item}
              className={`px-1 cursor-pointer capitalize ${
                item === current && "font-bold"
              }`}
            >
              {item}
            </Wrapper>
          ))}
        </Wrapper>
      )}
    </div>
  );
};

export default Select;
