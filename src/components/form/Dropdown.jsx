import Image from "@/components/image/Image";
import React, { useState } from "react";
import dropdown from "@/assets/dropdown.svg";
import Label from "./Label";

const Dropdown = ({ label, options, value, onChange, defaultTitle, className }) => {
  const [isOpen, setIsOpen] = useState(null);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return (
      <li
        className="py-3 px-4 my-2 hover:bg-gray-200 rounded-lg"
        key={option.title}
        onClick={() => handleOptionClick(option)}
      >
        {option.title}
      </li>
    );
  });
  
  return (
    <div className={`flex flex-col relative ${label && "gap-1 md:gap-2 lg:gap-3"} ${className}`}>
      {label && <Label required>{label}</Label>}
      <div
        className={`w-full p-4 relative text-sm transition-all duration-300 outline-none rounded-lg border border-black  ${value && "bg-neutral-100"} md:text-base md:p-4 focus:border-primary-100 placeholder:text-secondary-100 font-bold`}
        onClick={handleClick}
      >
        {value?.title || defaultTitle}
        <Image
          src={dropdown}
          alt="dropdown-btn"
          className="absolute -translate-y-1/2 top-1/2 right-5"
        />
      </div>
      {isOpen && (
        <ul
          className={`border border-black w-full max-h-[400px] block my-4 overflow-y-scroll py-2  absolute z-50 text-sm top-full transition-all duration-300 outline-none bg-neutral-100 md:text-base md:px-2 placeholder:text-secondary-100 font-bold`}
        >
          {renderedOptions}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
