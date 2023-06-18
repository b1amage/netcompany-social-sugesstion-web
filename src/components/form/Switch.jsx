import React from "react";
import Label from "./Label";

const Switch = ({ checked, id, label, onClick }) => {
  return (
    <div className={`flex flex-col ${label && "gap-1 md:gap-2 lg:gap-3"}`}>
      <Label htmlFor={id}>{label}</Label>
      <div
        onClick={onClick}
        className={`w-[80px] h-[40px] rounded-full  relative border-2 border-primary-400 cursor-pointer transition-all duration-200 ease-in-out ${
          checked ? "bg-green-500" : "bg-neutral-500"
        }`}
      >
        <div
          className={`w-[30px] h-[30px] rounded-full absolute bg-white top-1/2 left-2 -translate-y-1/2 transition-all duration-200 ease-in-out ${
            checked ? "translate-x-[30px]" : "translate-x-0"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Switch;
