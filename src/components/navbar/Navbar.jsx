import React, { useCallback, useEffect, useState } from "react";
import close from "@/assets/close.svg";
import { darkIcons, lightIcons } from "@/constants/navIcons";
import useViewport from "@/hooks/useScreenWidth";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   handleOpenSideBarClick,
//   handleCloseSideBarClick,
//   validatePathname,
// } from "@/features/navbarSlice.js";
import Image from "@/components/image/Image";
import darkMenu from "@/assets/dark-menu.svg";
import logo from "@/assets/netcompany_logo.svg";

import NavButton from "./NavButton";
import { navlinks } from "@/constants/navlinks";
import ReactDOM from "react-dom";

const Navbar = () => {
  const { width } = useViewport();

  // const dispatch = useDispatch();

  // const {
  //   isAdded,
  //   isMenuClicked,
  //   isShowFilter,
  //   isShowNotification,
  // } = useSelector(({ navbar }) => {
  //   return {
  //     isAdded: navbar.isAdded,
  //     isMenuClicked: navbar.isMenuClicked,
  //     isShowNotification: navbar.isShowNotification,
  //     isShowFilter: navbar.isShowFilter,
  //   };
  // });

  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const handleOpenSideBar = () => {
    // dispatch(handleOpenSideBarClick());
    setIsMenuClicked(true);
  };

  const handleCloseSideBar = () => {
    // dispatch(handleCloseSideBarClick());
    setIsMenuClicked(false);
  };
  const handleNavButtonClick = () => {
    // dispatch(handleCloseSideBarClick());
    setIsMenuClicked(false);
  };
  const renderedNavLinks = navlinks.map((link, index) => {
    return (
      <NavButton
        to={link.path}
        onClick={() => handleNavButtonClick(link.path)}
        label={link.label}
        key={link.label}
        src={width < 768 ? lightIcons[index] : darkIcons[index]}
        isActive={window.location.pathname === link.path}
      />
    );
  });

  return ReactDOM.createPortal(
    <nav className="relative h-full top-0">
      <div className="top-0 z-50 sticky w-full">
        {width < 768 ? (
          <Image
            imageClassName=""
            src={darkMenu}
            alt="menu"
            className="w-[28px] h-[28px] ml-4 my-6 bg-white sticky"
            onClick={handleOpenSideBar}
          />
        ) : (
          <Image
            className="w-full py-4 bg-primary-400 rounded-none flex justify-center"
            imageClassName="!w-fit"
            src={logo}
            alt="logo"
          />
        )}

        <div className={` `}>
          {isMenuClicked && (
            <div className="fixed md:hidden inset-0 bg-neutral-100 duration-300"></div>
          )}
          <ul
            className={`flex flex-col top-0 w-fit fixed h-full bg-primary-400 md:w-full md:h-fit md:flex-row md:bg-white md:justify-center md:gap-2 md:border-b md:border-b-black/50 text-white md:text-black 
        ${isMenuClicked ? " translate-x-0" : "-translate-x-full"}
        md:translate-x-0 duration-300 md:relative`}
          >
            <Image
              className="w-[28px] h-[28px] ml-4 my-6 md:hidden "
              src={close}
              alt="close"
              onClick={handleCloseSideBar}
            />
            {renderedNavLinks}
          </ul>
        </div>
      </div>
    </nav>,
    document.querySelector(".navbar-container")
  );
};

export default Navbar;
