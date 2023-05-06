import Image from "@/components/image/Image";
import React, { useState } from "react";
import dropdown from '@/assets/dropdown.svg'
const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(null)
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onChange(option);
  };

  const renderedOptions = options.map((option) => {
    return <li className="py-3 px-4 my-2 hover:bg-gray-200 rounded-lg" key={option.title} onClick={() => handleOptionClick(option)}>
            {option.title}
        </li>;
  });
  return (
    <div>
        <div className="w-full px-4 py-3 text-sm transition-all duration-300 outline-none rounded-lg bg-neutral-100 md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 font-bold relative" onClick={handleClick}>
            {value?.title || 'CATEGORY'}
            <Image src={dropdown} alt='dropdown-btn' className='absolute -translate-y-1/2 top-1/2 right-5' />
        </div>
        {isOpen && <ul className={`w-full  my-4 px-4 py-3 text-sm ${isOpen ? 'translate-y-0': '-translate-y-full'} transition-all duration-300 outline-none rounded-lg bg-neutral-100 md:text-base md:px-6 md:py-4 focus:border-primary-100 placeholder:text-secondary-100 font-bold`}>
            {renderedOptions}
        </ul>}
    </div>
  );
};

export default Dropdown;
