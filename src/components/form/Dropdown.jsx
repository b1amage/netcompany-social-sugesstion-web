import Image from "@/components/image/Image";
import React, { useRef, useState } from "react";
import dropdown from "@/assets/dropdown.svg";
import Label from "./Label";
import Error from "./Error";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const Dropdown = ({
  label,
  options,
  value,
  onChange,
  defaultTitle,
  className,
  required,
  err
}) => {
  const [isOpen, setIsOpen] = useState(null);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const dropdownRef = useRef()
  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  const renderedOptions = options.map((option) => {
    return (
      <li
        className="py-2 px-4 my-2 hover:bg-neutral-100/30 duration-300"
        key={option.title}
        onClick={() => handleOptionClick(option)}
      >
        {option.title}
      </li>
    );
  });

  return (
    <div
      className={`flex flex-col relative ${
        label && "gap-1 md:gap-2 lg:gap-3"
      }`}
      ref={dropdownRef}
    >
      {label && <Label required={required}>{label}</Label>}
      <div
        className={`w-full p-4 relative text-sm transition-all duration-300 outline-none rounded-lg border border-black  ${
          value && "bg-white"
        } md:text-base md:p-4 placeholder:text-secondary-100 font-bold ${(value?.title || value) && "border-green-500 border-2"} ${(isOpen ? (value?.tilte ? "border-green-500 border-2" : "border-secondary-400 border-2") : "")} ${className}`}
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
          
          className={`border border-primary-400  w-full max-h-[400px] block my-2 overflow-y-scroll bg-primary-400 text-white  absolute z-50 text-sm top-full transition-all duration-300 outline-none  md:text-base md:px-2 placeholder:text-secondary-100 font-bold`}
        >
          {renderedOptions}
        </ul>
      )}
      {err && <Error fluid>{err}</Error>}
    </div>
  );
};

export default Dropdown;
