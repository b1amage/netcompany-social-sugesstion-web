import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useViewport from "@/hooks/useScreenWidth";
import NavButton from "./NavButton";
import { navlinks } from "@/constants/navlinks";
import Image from "@/components/image/Image";
import logo from "@/assets/netcompany_logo.svg";
import { darkIcons, lightIcons } from "@/constants/navIcons";
import darkMenu from "@/assets/dark-menu.svg";
import notification from "@/assets/bell.svg";
import whiteNotification from "@/assets/white_bell.svg";
import close from "@/assets/close.svg";
import { createPortal } from "react-dom";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useDispatch } from "react-redux";
import Wrapper from "@/components/wrapper/Wrapper";
import logoutImg from "@/assets/navigation/logout.svg";
import { useNavigate } from "react-router-dom";
import Popup from "@/components/popup/Popup";
import ROUTE from "@/constants/routes";
import { logout } from "@/features/userSlice";
import Button from "@/components/button/Button";
import useAuthentication from "@/hooks/useAuthentication";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Heading from "@/components/typography/Heading";
import { mockNotification } from "@/constants/notifications";
import NotificationCard from "@/components/card/NotificationCard";
import { BsFillCircleFill } from "react-icons/bs";
import { RxTriangleUp } from "react-icons/rx";
import notificationApi from "@/api/notificationApi";
import { data } from "autoprefixer";

// import { Autocomplete } from "@react-google-maps/api";
const BREAK_POINT_NAVBAR = 768;

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unseenNotificationCount, setUnseenNotificationCount] = useState()
  const viewport = useViewport();

  const { isLogin, isShowOnBoarding } = useAuthentication();
  const navbarRef = useRef();
  const notificationsRef=useRef()
  useOnClickOutside(navbarRef, () => {
    // dispatch(handleCloseSideBarClick())
    setShow(false);
  });

  useOnClickOutside(notificationsRef, () => {
    setShowNotificationPopup(false)
  })
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const closePopup = () => setShowPopup(false);
  const confirmLogout = () => {
    closePopup();
    dispatch(logout());
    navigate(ROUTE.LOGIN);
  };

  const getAllNotifications = () =>{
    const getNotifications = async() => {
      const response = await notificationApi.getNotifications()
      console.log(response)
      setNotifications(response.data.results)
    }
    getNotifications()
  }
  const popupActions = [
    {
      title: "cancel",
      danger: false,
      buttonClassName:
        "bg-white border-primary-400 border !text-primary-400 hover:bg-primary-400 hover:opacity-100 hover:!text-white",
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

  useEffect(() => {
    if (showNotificationPopup && viewport.width <= BREAK_POINT_NAVBAR) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [showNotificationPopup]);

  useEffect(() => {
    const getUnseenCount = async() => {
      const response = await notificationApi.getUnseenNotifications()
      setUnseenNotificationCount(response.data)
    }
    getUnseenCount()
  },[])
  // console.log(notifications.filter(notification => notification.isSeen === true))
  return createPortal(
    <nav className="w-full bg-white border-b border-gray-200">
      {showPopup && (
        <Popup
          onClose={closePopup}
          title="Are you sure you want to logout Netcompany Suggestion System"
          actions={popupActions}
        />
      )}
      <div className="relative">
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

            <Wrapper className="mr-4 items-center w-full justify-end !absolute top-1/2 -translate-y-1/2 !gap-4">
              {/* {isShowNotification && ( */}
              <div
                onClick={() => {
                  setShowNotificationPopup(state => !state);
                  getAllNotifications()
                }}
                className="relative"
              >
                <Image
                  imageClassName=""
                  src={whiteNotification}
                  alt="notification"
                  className="w-[28px] h-[28px] mt-1 mr-0.5"
                />
                {unseenNotificationCount > 0 && (
                  <BsFillCircleFill className="text-secondary-400 absolute top-0 right-0" />
                )}
                {
                  showNotificationPopup && viewport.width > BREAK_POINT_NAVBAR && <RxTriangleUp className="text-white absolute text-2xl translate-x-1/2 right-1/2" />
                }
              </div>
              {/* )} */}
              {isLogin && !isShowOnBoarding && (
                <Button
                  onClick={() => setShowPopup(true)}
                  className={`!my-0  py-1.5 mr-4 !border-danger !bg-danger !right-0`}
                  danger
                >
                  Log out
                </Button>
              )}
            </Wrapper>
            {showNotificationPopup && viewport.width > BREAK_POINT_NAVBAR && (
              <Wrapper
                _ref={notificationsRef}
                col="true"
                className="bg-white !gap-0 max-h-[50vh] border-x border-b overflow-y-auto absolute right-4"
              >
                {notifications.map((notification, index) => {
                  return (
                    <NotificationCard
                      notification={notification}
                      onClick={() => {
                        navigate(
                          (notification.redirectTo.modelType === "EVENT" && notification.notifiCationType === "EVENT_MODIFICATION"
                            ? `event/${notification.redirectTo.targetId}`
                            : `/error/This event no longer exist`) ||
                            (notification.redirectTo.modelType === "ITINERARY" && notification.notifiCationType === "ITINERARY_MODIFICATION"
                            ? `/itinerary/details/${notification.redirectTo.targetId}`
                            : `/error/This itinerary no longer exist`)
                        );
                        setShowNotificationPopup(false);
                      }}
                      key={index}
                    />
                  );
                })}
              </Wrapper>
            )}
          </div>
        )}

        {/* CTA Button */}
        {isLogin && !isShowOnBoarding && (
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

                <Wrapper className="mr-4 relative items-center w-full justify-end">
                  {/* {isShowNotification && ( */}
                  <div
                    className="relative"
                    onClick={() => {
                      setShowNotificationPopup(state => !state);
                      getAllNotifications()    
                    }}
                  >
                    <Image
                      imageClassName=""
                      src={notification}
                      alt="notification"
                      className="w-[28px] h-[28px] mt-1 mr-0.5"
                    />
                    {/* <Counter count={10} /> */}
                    {unseenNotificationCount > 0 && (
                      <BsFillCircleFill className="text-secondary-400 absolute top-0 right-0" />
                    )}
                  </div>
                  {/* )} */}
                </Wrapper>
              </>
            )}
          </div>
        )}

        {/* Navigation */}

        {viewport.width > BREAK_POINT_NAVBAR && isLogin && !isShowOnBoarding ? (
          <Wrapper col="true" className="gap-4 bg-white">
            <div className="flex justify-center gap-4 mt-0 text-sm font-medium bg-transparent border-0 rounded-lg">
              {navlinks.length > 0 &&
                navlinks.map((link, index) => (
                  <NavButton
                    to={link.path}
                    key={index}
                    label={link.label}
                    src={darkIcons[index]}
                    isActive={window.location.pathname === link.path}
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
      {showNotificationPopup && viewport.width <= BREAK_POINT_NAVBAR && (
        <Popup
          onClose={() => {}}
          actions={[]}
          // title="Search location"
          children={
            <>
              <Wrapper className="absolute w-full bg-primary-400 justify-center py-2">
                <Button
                  className="!p-0 !bg-transparent !absolute left-2 top-1/2 -translate-y-1/2 !rounded-none !border-none !my-0"
                  onClick={() => {}}
                >
                  <AiOutlineArrowLeft
                    onClick={() => setShowNotificationPopup(false)}
                    className="text-[20px] font-bold text-white "
                  />
                </Button>
                <Heading className="text-white">Notifications</Heading>
              </Wrapper>
              <Wrapper
                _ref={notificationsRef}
                col="true"
                className="pt-[40px] !gap-0 max-h-[100vh] overflow-y-auto notifications"
              >
                {notifications.map((notification, index) => {
                  return (
                    <NotificationCard
                      notification={notification}
                      onClick={() => {
                        navigate(
                          (notification.redirectTo.modelType === "EVENT" && notification.notifiCationType === "EVENT_MODIFICATION"
                            ? `event/${notification.redirectTo.targetId}`
                            : `/error/This event no longer exist`) ||
                            (notification.redirectTo.modelType === "ITINERARY" && notification.notifiCationType === "ITINERARY_MODIFICATION"
                            ? `/itinerary/details/${notification.redirectTo.targetId}`
                            : `/error/This itinerary no longer exist`)
                        );
                        setShowNotificationPopup(false);
                      }}
                      key={index}
                    />
                  );
                })}
              </Wrapper>
            </>
          }
          className={`!justify-end`}
          formClassName="!w-full sm:!w-3/4 !h-screen !p-0 !rounded-none !block "
          titleClassName="text-[20px]"
          childrenClassName=""
        />
      )}
    </nav>,
    document.querySelector(".navbar-container")
  );
};

export default Navbar;
