import React, { useEffect, useState } from "react";
import close from "@/assets/close.svg";
import { darkIcons, lightIcons } from "@/constants/navIcons";
import NavHeader from "./NavHeader";
import useViewport from "@/hooks/useScreenWidth";
import { useDispatch, useSelector } from "react-redux";
// import {
//   handleOpenSideBarClick,
//   handleCloseSideBarClick,
//   validatePathname,
// } from "@/features/navbarSlice.js";
// import LoadingScreen from "@/screens/LoadingScreen";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { width } = useViewport();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // const {
  //   isAdded,
  //   isMenuClicked,
  //   isShowFilter,
  //   isShowNotification,
  //   currentPath,
  // } = useSelector(({ navbar }) => {
  //   return {
  //     isAdded: navbar.isAdded,
  //     isMenuClicked: navbar.isMenuClicked,
  //     isShowNotification: navbar.isShowNotification,
  //     isShowFilter: navbar.isShowFilter,
  //     currentPath: navbar.currentPath,
  //   };
  // });

  // const handleNavButtonClick = (to) => {
  //   dispatch(validatePathname(to));
  // };

  useEffect(() => {
    // dispatch(validatePathname(currentPath));
    console.log("Navbar is rerender")
  }, []);


  return (
    <>
      {/* {isLoading ? (
        <LoadingScreen />
      ) : ( */}
        <div className="relative h-full">
          <NavHeader
            screenWidth={width}
            // handleMenuClick={() => dispatch(handleOpenSideBarClick())}
            // isAdded={isAdded}
            // isShowNotification={isShowNotification}
            // isShowFilter={isShowFilter}
          />
          <Sidebar
            closeButtonIcon={close}
            // onClick={() => dispatch(handleCloseSideBarClick())}
            // handleNavButtonClick={handleNavButtonClick}
            navButtonIcons={width >= 768 ? darkIcons : lightIcons}
            screenWidth={width}
            // isMenuClicked={isMenuClicked}
          />
        </div>
      {/* )} */}
    </>
  );
};

export default Navbar;
