import React, { useEffect, useMemo, useState } from "react";
import close from "@/assets/close.svg";
import { darkIcons, lightIcons } from "@/constants/navIcons";
import NavHeader from "./NavHeader";
import useViewport from "@/hooks/useScreenWidth";
import { useDispatch, useSelector } from "react-redux";
import {
  handleOpenSideBarClick,
  handleCloseSideBarClick,
  validatePathname,
  directTo,
} from "@/store";
import LoadingScreen from "@/screens/LoadingScreen";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { width } = useViewport();

  const dispatch = useDispatch();

  const state = useSelector(({navbar}) => {
    return {
      isAdded: navbar.isAdded,
      isMenuClicked: navbar.isMenuClicked,
      isShowNotification: navbar.isShowNotification,
      isShowFilter: navbar.isShowFilter,
      currentPath: navbar.currentPath,
      isLoading: navbar.isLoading,
    };
  });

  const {
    isMenuClicked,
    isAdded,
    isShowNotification,
    isShowFilter,
    currentPath,
    isLoading,
  } = useMemo(() => state, [state]);

  const handleNavButtonClick = (to) => {
    dispatch(directTo(to));
  };

  useEffect(() => {
    dispatch(validatePathname(currentPath));
  }, [currentPath]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="relative h-full">
          <NavHeader
            screenWidth={width}
            handleMenuClick={() => dispatch(handleOpenSideBarClick())}
            isAdded={isAdded}
            isShowNotification={isShowNotification}
            isShowFilter={isShowFilter}
          />
          <Sidebar closeButtonIcon={close} handleNavButtonClick={handleNavButtonClick} onClick={() => dispatch(handleCloseSideBarClick())} navButtonIcons={width >= 768 ? darkIcons : lightIcons} screenWidth={width} isMenuClicked={isMenuClicked} />
        </div>
      )}
    </>
  );
};

export default Navbar;
