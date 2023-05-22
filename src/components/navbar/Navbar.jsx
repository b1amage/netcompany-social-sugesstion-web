// import React, { useCallback, useEffect, useState } from "react";
// import close from "@/assets/close.svg";
// import { darkIcons, lightIcons } from "@/constants/navIcons";
// import useViewport from "@/hooks/useScreenWidth";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   handleOpenSideBarClick,
// //   handleCloseSideBarClick,
// //   validatePathname,
// // } from "@/features/navbarSlice.js";
// import Image from "@/components/image/Image";
// import darkMenu from "@/assets/dark-menu.svg";
// import logo from "@/assets/netcompany_logo.svg";

// import NavButton from "./NavButton";
// import { navlinks } from "@/constants/navlinks";
// import ReactDOM from "react-dom";

// const Navbar = () => {
//   const { width } = useViewport();

//   // const dispatch = useDispatch();

//   // const {
//   //   isAdded,
//   //   isMenuClicked,
//   //   isShowFilter,
//   //   isShowNotification,
//   // } = useSelector(({ navbar }) => {
//   //   return {
//   //     isAdded: navbar.isAdded,
//   //     isMenuClicked: navbar.isMenuClicked,
//   //     isShowNotification: navbar.isShowNotification,
//   //     isShowFilter: navbar.isShowFilter,
//   //   };
//   // });

//   const [isMenuClicked, setIsMenuClicked] = useState(false);

//   const handleOpenSideBar = () => {
//     // dispatch(handleOpenSideBarClick());
//     setIsMenuClicked(true);
//   };

//   const handleCloseSideBar = () => {
//     // dispatch(handleCloseSideBarClick());
//     setIsMenuClicked(false);
//   };
//   const handleNavButtonClick = () => {
//     // dispatch(handleCloseSideBarClick());
//     setIsMenuClicked(false);
//   };
//   const renderedNavLinks = navlinks.map((link, index) => {
//     return (
//       <NavButton
//         to={link.path}
//         onClick={() => handleNavButtonClick(link.path)}
//         label={link.label}
//         key={link.label}
//         src={width < 768 ? lightIcons[index] : darkIcons[index]}
//         isActive={window.location.pathname === link.path}
//       />
//     );
//   });

//   return ReactDOM.createPortal(
//     <nav className="relative h-full top-0">
//       <div className="top-0 z-50 sticky w-full">
//         {width < 768 ? (
//           <Image
//             imageClassName=""
//             src={darkMenu}
//             alt="menu"
//             className="w-[28px] h-[28px] ml-4 my-6 bg-white sticky"
//             onClick={handleOpenSideBar}
//           />
//         ) : (
//           <Image
//             className="w-full py-4 bg-primary-400 rounded-none flex justify-center"
//             imageClassName="!w-fit"
//             src={logo}
//             alt="logo"
//           />
//         )}

//         <div className={` `}>
//           {isMenuClicked && (
//             <div className="fixed md:hidden inset-0 bg-neutral-100 duration-300"></div>
//           )}
//           <ul
//             className={`flex flex-col top-0 w-fit fixed h-full bg-primary-400 md:w-full md:h-fit md:flex-row md:bg-white md:justify-center md:gap-2 md:border-b md:border-b-black/50 text-white md:text-black
//         ${isMenuClicked ? " translate-x-0" : "-translate-x-full"}
//         md:translate-x-0 duration-300 md:relative`}
//           >
//             <Image
//               className="w-[28px] h-[28px] ml-4 my-6 md:hidden "
//               src={close}
//               alt="close"
//               onClick={handleCloseSideBar}
//             />
//             {renderedNavLinks}
//           </ul>
//         </div>
//       </div>
//     </nav>,
//     document.querySelector(".navbar-container")
//   );
// };

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
// import Logo from "@/components/utilities/image/Logo";
// import Button from "@/components/utilities/button/Button";
import useViewport from "@/hooks/useScreenWidth";
import NavButton from "./NavButton";
import { navlinks } from "@/constants/navlinks";
import Image from "@/components/image/Image";
import logo from "@/assets/netcompany_logo.svg";
import { darkIcons, lightIcons } from "@/constants/navIcons";
import darkMenu from "@/assets/dark-menu.svg";
import close from "@/assets/close.svg";

const BREAK_POINT_NAVBAR = 768;

const Navbar = () => {
  const [show, setShow] = useState(false);
  const viewport = useViewport();

  return (
    <nav className="bg-white sticky w-full z-50 top-0 left-0 border-b border-gray-200">
      <div className="">
        {/* Logo */}
        {viewport.width > BREAK_POINT_NAVBAR && (
          <Link to="/" className="">
            {/* <Logo className="!w-14 !h-14" /> */}
            <Image
              className="w-full py-4 bg-primary-400 rounded-none flex justify-center"
              imageClassName="!w-fit"
              src={logo}
              alt="logo"
            />
          </Link>
        )}

        {/* CTA Button */}
        <div className="flex items-center">
          {viewport.width <= BREAK_POINT_NAVBAR && (
            <Image
              imageClassName=""
              src={darkMenu}
              alt="menu"
              className="w-[28px] h-[28px] ml-5 my-6 bg-white sticky"
              onClick={() => setShow(!show)}
            />
          )}
        </div>

        {/* Navigation */}

        {viewport.width > BREAK_POINT_NAVBAR ? (
          <div className="flex p-4 mt-0 justify-center text-sm font-medium bg-transparent border-0 rounded-lg">
            {navlinks.length > 0 &&
              navlinks.map((link, index) => (
                <NavButton
                  to={link.path}
                  key={index}
                  label={link.label}
                  src={darkIcons[index]}
                  className=""
                />
              ))}
          </div>
        ) : (
          <div
            className={`items-center justify-between w-full  ${
              show ? "block" : "hidden"
            }`}
          >
            <div className="fixed md:hidden inset-0 bg-neutral-100 duration-300"></div>
            <ul className={`flex flex-col ${show ? 'translate-x-0' : '-translate-x-full'} duration-300 fixed top-0 h-full pb-6 text-white bg-primary-400 md:mt-0 md:text-sm md:font-medium md:bg-white`}>
              <Image
                className="w-[28px] h-[28px] ml-5 my-6 md:hidden "
                src={close}
                alt="close"
                onClick={() => setShow(!show)}
              />
              {navlinks.length > 0 &&
                navlinks.map((link, index) => (
                  <NavButton
                    to={link.path}
                    key={index}
                    label={link.label}
                    src={lightIcons[index]}
                    isActive={window.location.pathname === link.path}
                    onClick={() => setShow(!show)}
                  />
                ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
