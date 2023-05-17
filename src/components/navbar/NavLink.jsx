import Image from "@/components/image/Image";
import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({to, label, src, onClick, screenWidth}) => {
  return (
    <Link
      onClick={onClick}
      className={`flex items-center py-4 pl-2 pr-20 mx-3 my-2 md:mx-0 md:px-4 hover:bg-gray-50/10 rounded-lg duration-200 cursor-pointer md:hover:bg-gray-200 ${
        window.location.pathname === to ? screenWidth < 768 ? "bg-gray-50/10" : 'bg-gray-200' : ''
      }`}
    >
      <Image
        src={src}yar
        alt="icon"
        className="w-[20px] h-[20px]"
        imageClassName=''
      />
      <h1 className="text-[16px] pl-2 font-bold">{label}</h1>
    </Link>
  );
};

export default NavLink;
