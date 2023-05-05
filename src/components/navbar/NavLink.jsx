import Image from "@/components/image/Image";
import React from "react";
import { Link } from "react-router-dom";

const NavLink = ({to, label, src, onClick, screenWidth}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center py-4 pl-2 pr-20 mx-4 my-2 md:mx-0 md:px-4 md:bg-white bg-primary-400 hover:bg-gray-50/10 rounded-lg duration-200 ${
        window.location.pathname === to && screenWidth < 768 && "bg-gray-50/10 rounded-lg"
      }`}
    >
      <Image
        src={src}
        alt="icon"
        className="w-[20px] h-[20px]"
      />
      <h1 className="text-[16px] pl-2 font-bold">{label}</h1>
    </Link>
  );
};

export default NavLink;
