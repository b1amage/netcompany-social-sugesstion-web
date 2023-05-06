import React from "react";
import NavLink from "./NavLink";
import { navlinks } from "@/constants/navlinks";
import Image from "@/components/image/Image";

const Sidebar = ({closeButtonIcon, handleNavButtonClick, onClick, navButtonIcons, screenWidth, isMenuClicked}) => {
  const renderedNavLinks = navlinks.map((link, index) => {
    return (
      <NavLink
        onClick={() => handleNavButtonClick(link.path)}
        label={link.label}
        key={link.label}
        src={navButtonIcons[index]}
        screenWidth={screenWidth}
      />
    );
  });
  return (
    <ul
      className={`w-fit fixed z-50 top-0 flex h-full flex-col bg-primary-400 md:w-full md:h-fit md:flex-row md:bg-white md:justify-center md:gap-2 md:border-b md:border-b-black/50 text-white md:text-black ${
        isMenuClicked
          ? " translate-x-0"
          : screenWidth < 768
          ? "-translate-x-full"
          : ""
      } duration-300 md:relative`}
    >
      <Image
        className="w-[28px] h-[28px] ml-4 my-6 md:hidden"
        src={closeButtonIcon}
        alt="close"
        onClick={onClick}
      />
      {renderedNavLinks}
    </ul>
  );
};

export default Sidebar;
