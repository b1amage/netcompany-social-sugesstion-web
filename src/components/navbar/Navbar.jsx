import { navlinks } from "@/constants/navlinks";
import Image from "@/components/image/Image";
import React, { useEffect, useState } from "react";
import close from "@/assets/close.svg";
import { darkIcons, lightIcons } from "@/constants/navIcons";

import NavLink from "./NavLink";
import NavHeader from "./NavHeader";
import useViewport from "@/hooks/useScreenWidth";

const Navbar = () => {
  const {width} = useViewport()
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);

  const handleMenuClick = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  const renderedNavLinks = navlinks.map((link, index) => {
    return (
      <NavLink
        to={link.path}
        onClick={handleMenuClick}
        label={link.label}
        key={link.label}
        src={width >= 768 ? darkIcons[index] : lightIcons[index]}
        screenWidth={width}
      />
    );
  });

  // useEffect(() => {
  //   let currentPath = window.location.pathname;
    
  // }, [window.location.pathname]);
  
  return (
    <div className="relative h-full">
      <NavHeader screenWidth={width} handleMenuClick={handleMenuClick} isAdded={isAdded} isShowNotification={isShowNotification} isShowFilter={isShowFilter} />

      <div
        className={`w-fit fixed z-50 top-0 flex h-full flex-col bg-primary-400 md:w-full md:h-fit md:flex-row md:bg-white md:justify-center md:gap-2 md:border-b md:border-b-black/50 text-white md:text-black ${
          isMenuClicked
            ? " translate-x-0"
            : width < 768
            ? "-translate-x-full"
            : ""
        } duration-300 md:relative`}
      >
        <Image
          className="w-[28px] h-[28px] ml-4 my-6 md:hidden"
          imageClassName=""
          src={close}
          alt="menu"
          onClick={handleMenuClick}
        />
        {renderedNavLinks}
      </div>
    </div>
  );
};

export default Navbar;
