import Image from "@/components/image/Image";
import React, { memo } from "react";
import { Link } from "react-router-dom";

const NavButton = ({to, label, src, onClick, isActive, className}) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      className={`flex items-center py-4 pl-3 pr-20 mx-3 my-2 md:mx-0 md:px-4 hover:bg-gray-50/10 rounded-lg duration-200 cursor-pointer md:hover:bg-gray-200 md:bg-gray-50/10 bg-gray-200" 
      ${isActive && 'bg-gray-50/10'} ${className}`}
      prefetch="true"
    >
      <Image
        src={src}
        alt="icon"
        className="w-[20px] h-[20px]"
        imageClassName=''
      />
      <h1 className="text-[16px] pl-2 font-bold">{label}</h1>
    </Link>
  );
}
export default NavButton;
