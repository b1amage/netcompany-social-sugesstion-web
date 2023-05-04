import { navlinks } from "@/constants/navlinks";
import Image from "@/components/image/Image";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { darkIcons, lightIcons } from "@/constants/navIcons";
import menu from "@/assets/menu.svg";
import darkMenu from "@/assets/dark-menu.svg";
import logo from "@/assets/netcompany_logo.svg";

const Navbar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleMenuClick = () => {
    setIsMenuClicked(!isMenuClicked)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log(screenWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth]);

  return (
    <div className="relative h-full">
      <div className="flex md:justify-around items-center ">
        <Image
          className="pr-44 pl-2 py-4 hover:opacity-60 duration-200"
          imageClassName="w-[20px] h-[20px]"
          src={screenWidth > 768 ? menu : darkMenu}
          alt="menu"
          onClick={handleMenuClick}
        />
        {screenWidth >= 768 && (
          <Image className="w-fit h-[20px]" src={logo} alt="logo" />
        )}
      </div>
      
      <div className={`w-fit fixed z-50 top-0 flex h-full flex-col bg-primary-400 md:w-full md:h-fit md:flex-row md:bg-white md:justify-center md:gap-8 text-white md:text-black ${isMenuClicked ? ' translate-x-0' : screenWidth < 768 ? '-translate-x-full' : ''} duration-300`}>
        <Image
          className="w-[20px] h-[20px] ml-2 my-4 hover:opacity-60 duration-200"
          imageClassName=""
          src={menu}
          alt="menu"
          onClick={handleMenuClick}
        />

        {navlinks.map((link, index) => {
          return (
            <Link
              to={link.path}
              key={link.label}
              className="flex items-center py-4 pl-2 pr-24 md:px-4 hover:opacity-60 duration-200"
            >
              <Image
                src={screenWidth >= 768 ? darkIcons[index] : lightIcons[index]}
                alt="icon"
                className="w-[20px] h-[20px]"
              />
              <h1 className="text-[16px] pl-2 font-bold">{link.label}</h1>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
