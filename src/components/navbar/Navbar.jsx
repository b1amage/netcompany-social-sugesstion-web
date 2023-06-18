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
import locationImg from "@/assets/location.svg";

import filter from "@/assets/filter.svg";
import darkLogoutImg from "@/assets/navigation/dark-logout.svg";
import close from "@/assets/close.svg";
import { createPortal } from "react-dom";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { validatePathname } from "@/features/navbarSlice";
import Wrapper from "@/components/wrapper/Wrapper";
import Counter from "@/components/counter/Counter";
import Heading from "@/components/typography/Heading";
import logoutImg from "@/assets/navigation/logout.svg";
import { useNavigate } from "react-router-dom";
import Popup from "@/components/popup/Popup";
import ROUTE from "@/constants/routes";
import { logout } from "@/features/userSlice";
import Button from "@/components/button/Button";
import { BsArrowBarLeft, BsPencilFill } from "react-icons/bs";
import useAuthentication from "@/hooks/useAuthentication";

import AutoCompleteScreen from "@/test/AutoComplete";
import {
  changeCurrentLocation,
  changeLatitude,
  changeLongitude,
} from "@/features/currentLocationSlice";
import useCurrentLocation from "@/hooks/useCurrentLocation";
import { GoArrowLeft } from "react-icons/go";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Filter from "@/components/filter/Filter";

// import { Autocomplete } from "@react-google-maps/api";
const BREAK_POINT_NAVBAR = 768;

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const viewport = useViewport();

  const { isLogin } = useAuthentication();
  const navbarRef = useRef();
  useOnClickOutside(navbarRef, () => {
    // dispatch(handleCloseSideBarClick())
    setShow(false);
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

  const onChangeCurrentLocation = (location, latitude, longitude) => {
    dispatch(changeCurrentLocation(location));
    dispatch(changeLatitude(latitude));
    dispatch(changeLongitude(longitude));
    setShowAutoComplete(false);
  };
  const {
    isAdded,
    isShowNotification,
    isShowFilter,
    isShowEdit,
    currentLocation,
  } = useSelector(({ navbar, currentLocation }) => {
    return {
      isAdded: navbar.isAdded,
      isShowNotification: navbar.isShowNotification,
      isShowFilter: navbar.isShowFilter,
      isShowEdit: navbar.isShowEdit,
      currentLocation: currentLocation.currentLocation,
    };
  });
  // console.log(places[0].geometry.location.lat());
  // console.log(places[0].geometry.location.lng());
  useEffect(() => {
    dispatch(validatePathname(window.location.pathname));
    // console.log(location)
    // console.log([latitude, longitude])
    // console.log(location)
  }, [window.location.pathname, currentLocation]);

  const { isGetCurrentLocation } = useCurrentLocation();

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
          <div className="w-full relative bg-primary-400">
            {/* <Logo className="!w-14 !h-14" /> */}
            <Image
              className="flex justify-center !w-fit mx-auto py-4 rounded-none "
              imageClassName="!w-fit"
              src={logo}
              alt="logo"
              onClick={() => isLogin && navigate("/")}
            />

            {isLogin && (
              <Button
                onClick={() => setShowPopup(true)}
                className={`!my-0 !absolute top-1/2 -translate-y-1/2 py-1.5 mr-4 !border-danger !bg-danger !right-0`}
                danger
              >
                Logout
              </Button>
            )}
          </div>
        )}

        {/* CTA Button */}
        {isLogin && (
          <div className="flex items-center gap-4">
            {viewport.width <= BREAK_POINT_NAVBAR && (
              <>
                <Image
                  imageClassName=""
                  src={darkMenu}
                  alt="menu"
                  className="w-[40px] h-[28px] ml-5 my-6"
                  onClick={() => {
                    // dispatch(handleOpenSideBarClick())
                    setShow(!show);
                  }}
                />

                <Wrapper className="w-full truncate">
                  <Wrapper
                    className="flex gap-2  items-center"
                    onClick={() => setShowAutoComplete(true)}
                  >
                    <Image
                      src={locationImg}
                      alt="location"
                      className="w-[20px] h-[20px]"
                    />
                    <Heading className="!text-[16px] ">
                      {currentLocation
                        ? currentLocation.formatted_address
                        : !isGetCurrentLocation
                        ? "Enter a location"
                        : "...Loading"}
                    </Heading>
                  </Wrapper>
                </Wrapper>

                {/* <AutoCompleteScreen address  /> */}
                <Wrapper className="mr-4 items-center w-fit justify-end">
                  {isAdded && (
                    <Image
                      imageClassName=""
                      src={add}
                      alt="add"
                      className="w-[28px] h-[28px] m-2"
                      onClick={() => {
                        if (window.location.pathname === "/")
                          navigate("/create-location");
                      }}
                    />
                  )}
                  {isShowNotification && (
                    <div className="relative">
                      <Image
                        imageClassName=""
                        src={notification}
                        alt="notification"
                        className="w-[28px] h-[28px] m-2"
                      />
                      <Counter count={10} />
                    </div>
                  )}
                  {isShowFilter && <Filter />}
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
                </Wrapper>
              </>
            )}
          </div>
        )}

        {/* Navigation */}

        {viewport.width > BREAK_POINT_NAVBAR && isLogin ? (
          <Wrapper col="true" className="gap-4 bg-white">
            <div className="flex justify-center mt-0 text-sm font-medium bg-transparent border-0 rounded-lg">
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
          </Wrapper>
        ) : (
          <div className="">
            {show && (
              <div
                className="fixed inset-0 duration-300 md:hidden bg-black/50 backdrop-blur-md"
                onClick={() => setShow(false)}
              ></div>
            )}
            <ul
              // ref={navbarRef}
              className={`flex flex-col ${
                show ? "translate-x-0" : "-translate-x-full"
              } duration-300 fixed top-0 h-full pb-6 text-white bg-primary-400 md:mt-0 md:text-sm md:font-medium md:bg-white`}
            >
              <Image
                className="w-[28px] h-[28px] ml-5 my-6 md:hidden "
                src={close}
                alt="close"
                onClick={() => setShow(false)}
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

      {/* { && ( */}
      <Popup
        // onClose={() => setShowAutoComplete(false)}
        actions={[]}
        // title="Search location"
        children={
          <>
            {/* <Image
                  className={``}
                  onClick={() => setShowAutoComplete(false)}
                  src={close}
                  alt="close"
                /> */}
            <AiOutlineArrowLeft
              className="h-full w-[40px]"
              onClick={() => setShowAutoComplete(false)}
            />

            <AutoCompleteScreen
              // label="Location"
              className={`h-[50px] !py-2`}
              // address={currentLocation && currentLocation.formatted_address}
              onChange={onChangeCurrentLocation}
              // addressErr={addressErr}
            />
          </>
        }
        className={`${
          showAutoComplete ? "translate-x-0" : "translate-x-full"
        } duration-300`}
        formClassName="items-center animate-zoom h-full w-full !rounded-none !py-0"
        titleClassName="text-[20px]"
        childrenClassName="!mt-0 w-full "
        // setShowPopup={setShowAutoComplete}
      />
      {/* )} */}
    </nav>,
    document.querySelector(".navbar-container")
  );
};

export default Navbar;
