import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useViewport from "@/hooks/useScreenWidth";
import NavButton from "./NavButton";
import { navlinks } from "@/constants/navlinks";
import Image from "@/components/image/Image";
import logo from "@/assets/netcompany_logo.svg";
import { darkIcons, lightIcons } from "@/constants/navIcons";
import darkMenu from "@/assets/dark-menu.svg";
import add from "@/assets/add.svg";
import notification from "@/assets/bell.svg";

import filter from "@/assets/filter.svg";
import darkLogoutImg from "@/assets/navigation/dark-logout.svg";
import close from "@/assets/close.svg";
import { createPortal } from "react-dom";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { validatePathname } from "@/features/navbarSlice";
import logoutImg from "@/assets/navigation/logout.svg";
import { useNavigate } from "react-router-dom";
import Popup from "@/components/popup/Popup";
import ROUTE from "@/constants/routes";
import { logout } from "@/features/userSlice";
import SubNavbar from "./SubNavbar";
import Button from "@/components/button/Button";
import { BsPencilFill } from "react-icons/bs";
const BREAK_POINT_NAVBAR = 768;

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const viewport = useViewport();

  const navbarRef = useRef();
  useOnClickOutside(navbarRef, () => {
    // dispatch(handleCloseSideBarClick())
    setShow(!show);
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const closePopup = () => setShowPopup(false);
  const confirmLogout = () => {
    closePopup();
    dispatch(logout());
    navigate(ROUTE.LOGIN);
  };

  const popupActions = [
    {
      title: "cancel",
      danger: false,
      action: closePopup,
    },
    { title: "logout", danger: true, action: confirmLogout },
  ];

  useEffect(() => {
    // const html = document.querySelector("html");
    if (showPopup) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showPopup]);

  const { isAdded, isShowNotification, isShowFilter, isShowEdit } = useSelector(
    ({ navbar }) => {
      return {
        isAdded: navbar.isAdded,
        isShowNotification: navbar.isShowNotification,
        isShowFilter: navbar.isShowFilter,
        isShowEdit: navbar.isShowEdit,
      };
    }
  );

  useEffect(() => {
    dispatch(validatePathname(window.location.pathname));
  }, [window.location.pathname]);

  return createPortal(
    <nav className="w-full bg-white border-b border-gray-200">
      {showPopup && (
        <Popup
          onClose={closePopup}
          title="Are you sure you want to logout Netcompany Suggestion System"
          actions={popupActions}
        />
      )}
      <div className="">
        {/* Logo */}
        {viewport.width > BREAK_POINT_NAVBAR && (
          <div className="w-full relative">
            <Link to="/" className="">
              {/* <Logo className="!w-14 !h-14" /> */}
              <Image
                className="flex justify-center w-full py-4 rounded-none bg-primary-400"
                imageClassName="!w-fit"
                src={logo}
                alt="logo"
              />
            </Link>
            <Button
              onClick={() => setShowPopup(true)}
              className={`!my-0 !absolute top-1/2 -translate-y-1/2 py-1.5 mr-4 !border-danger !bg-danger !right-0`}
              danger
            >
              Logout
            </Button>
          </div>
        )}

        {/* CTA Button */}
        <div className="flex items-center justify-between">
          {viewport.width <= BREAK_POINT_NAVBAR && (
            <>
              <Image
                imageClassName=""
                src={darkMenu}
                alt="menu"
                className="w-[28px] h-[28px] ml-5 my-6"
                onClick={() => {
                  // dispatch(handleOpenSideBarClick())
                  setShow(!show);
                }}
              />

              <SubNavbar isAdded={isAdded} isShowNotification={isShowNotification} isShowFilter={isShowFilter} />
                {isShowEdit && (
                  <Wrapper className="flex-center">
                    <Button
                      onClick={() => navigate(ROUTE.EDIT_PROFILE)}
                      className="!text-primary-800 !relative !gap-2"
                    >
                      <BsPencilFill />
                      <span className="hidden capitalize lg:block">
                        Edit info
                      </span>
                    </Button>
                    {/* <Button
                    className="!bg-danger"
                    onClick={() => {
                      setShowPopup(true);
                    }}
                  >
                    Logout
                  </Button> */}
                  </Wrapper>
                )}
            </>
          )}
        </div>

        {/* Navigation */}

        {viewport.width > BREAK_POINT_NAVBAR ? (
          <div className="flex justify-center p-4 mt-0 text-sm font-medium bg-transparent border-0 rounded-lg">
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
          <div className="">
            {show && (
              <div className="fixed inset-0 duration-300 md:hidden bg-black/50 backdrop-blur-md"></div>
            )}
            <ul
              // ref={navbarRef}
              onClick={() => setShow(!show)}
              className={`flex flex-col ${
                show ? "translate-x-0" : "-translate-x-full"
              } duration-300 fixed top-0 h-full pb-6 text-white bg-primary-400 md:mt-0 md:text-sm md:font-medium md:bg-white`}
            >
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

              <NavButton
                label="Logout"
                onClick={() => setShowPopup(true)}
                src={logoutImg}
                className={`!mt-auto flex items-center py-4 pl-3 pr-20 mx-3 my-2 md:mx-0 md:px-4 hover:bg-gray-50/10 rounded-lg duration-200 cursor-pointer md:hover:bg-gray-200 md:bg-gray-50/10 `}
              />
            </ul>
          </div>
        )}
      </div>
    </nav>,
    document.querySelector(".navbar-container")
  );
};

export default Navbar;
