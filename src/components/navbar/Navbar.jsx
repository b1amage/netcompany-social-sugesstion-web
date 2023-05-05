import { navlinks } from "@/constants/navlinks";
import Image from "@/components/image/Image";
import React, { useEffect, useState } from "react";
import close from "@/assets/close.svg";
import { darkIcons, lightIcons } from "@/constants/navIcons";

import NavLink from "./NavLink";
import NavHeader from "./NavHeader";

const Navbar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isShowFilter, setIsShowFilter] = useState(false);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleMenuClick = () => {
    setIsMenuClicked(!isMenuClicked);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    console.log(screenWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenWidth]);

  const renderedNavLinks = navlinks.map((link, index) => {
    return (
      <NavLink
        to={link.path}
        onClick={handleMenuClick}
        label={link.label}
        key={link.label}
        src={screenWidth >= 768 ? darkIcons[index] : lightIcons[index]}
        screenWidth={screenWidth}
      />
    );
  });

  useEffect(() => {
    let currentPath = window.location.pathname;
    switch (currentPath) {
      case "/account":
        setIsAdded(true);
        setIsShowNotification(false);
        setIsShowFilter(false);
        return
      case "/my-event":
        setIsAdded(true);
        setIsShowNotification(true);
        setIsShowFilter(true);
        return
      case "/my-route":
        setIsAdded(true);
        setIsShowNotification(false);
        setIsShowFilter(false);
        return
      case "/plan-event":
        setIsAdded(false);
        setIsShowNotification(false);
        setIsShowFilter(false);
        return
      default:
        setIsAdded(true);
        setIsShowNotification(true);
        setIsShowFilter(true);
        return
    }
  }, [window.location.pathname]);
  
  return (
    <div className="relative h-full">
      <NavHeader screenWidth={screenWidth} handleMenuClick={handleMenuClick} isAdded={isAdded} isShowNotification={isShowNotification} isShowFilter={isShowFilter} />

      <div
        className={`w-fit fixed z-50 top-0 flex h-full flex-col bg-primary-400 md:w-full md:h-fit md:flex-row md:bg-white md:justify-center md:gap-2 md:border-b md:border-b-black/50 text-white md:text-black ${
          isMenuClicked
            ? " translate-x-0"
            : screenWidth < 768
            ? "-translate-x-full"
            : ""
        } duration-300 md:relative`}
      >
        <Image
          className="w-[28px] h-[28px] ml-6 my-4 md:hidden"
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
