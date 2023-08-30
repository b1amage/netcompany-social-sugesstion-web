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
import { AiOutlineArrowLeft, AiOutlineClose } from "react-icons/ai";
import Heading from "@/components/typography/Heading";
import { mockNotification } from "@/constants/notifications";
import NotificationCard from "@/components/card/NotificationCard";
import { BsFillCircleFill } from "react-icons/bs";
import { RxTriangleUp } from "react-icons/rx";
import notificationApi from "@/api/notificationApi";
import Pusher from "pusher-js";
import { toast } from "react-hot-toast";
import map from "@/assets/map.svg";
import planEvent from "@/assets/plan-event.svg";

import Text from "@/components/typography/Text";
import eventApi from "@/api/eventApi";

// import { Autocomplete } from "@react-google-maps/api";
const BREAK_POINT_NAVBAR = 768;
const URL =
  "https://netcompany-social-suggestion-backend.vercel.app" ||
  "http://localhost:8080/";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unseenNotificationCount, setUnseenNotificationCount] = useState();
  const [notificationNextCursor, setNotificationNextCursor] = useState();
  const [notificationsQueue, setNotificationsQueue] = useState([]);
  const [lastFetch, setLastFetch] = useState(Date.now());
  const viewport = useViewport();

  const { isLogin, isShowOnBoarding } = useAuthentication();
  const navbarRef = useRef();
  const notificationsRef = useRef();
  const listRef = useRef();
  useOnClickOutside(navbarRef, () => {
    // dispatch(handleCloseSideBarClick())
    setShow(false);
  });

  useOnClickOutside(notificationsRef, () => {
    setShowNotificationPopup(false);
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const closePopup = () => setShowPopup(false);
  const confirmLogout = () => {
    closePopup();
    dispatch(logout());
    navigate(ROUTE.LOGIN);
  };

  const getAllNotifications = () => {
    const getNotifications = async () => {
      const response = await notificationApi.getNotifications();
      console.log(response);
      setNotifications(response.data.results);
      localStorage.setItem(
        "notifications",
        JSON.stringify(response.data.results)
      );
      setNotificationNextCursor(response.data.next_cursor);
      localStorage.setItem(
        "notificationNextCursor",
        JSON.stringify(response.data.next_cursor)
      );
    };
    getNotifications();
  };
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
    if (isLogin && !isShowOnBoarding) {
      const getUnseenCount = async () => {
        const response = await notificationApi.getUnseenNotifications();
        setUnseenNotificationCount(response.data);
        console.log(response.data);
      };
      getUnseenCount();
    }
  }, [isLogin, isShowOnBoarding]);

  useEffect(() => {
    // Example code of Pusher
    // Enable pusher logging - don't include this in production

    if (isLogin && !isShowOnBoarding) {
      Pusher.logToConsole = true;
      Pusher.Runtime.createXHR = function () {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        return xhr;
      };
      console.log(
        "🚀 ~ file: App.jsx:42 ~ useEffect ~ localStorage.getItem('token_axios'):",
        localStorage.getItem("token_axios")
      );

      var pusher = new Pusher("8e3959b465d871f4bb36", {
        cluster: "ap1",
        forceTLS: true,
        auth: {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token_axios") &&
              localStorage.getItem("token_axios")
            }`,
          },
        },
        authEndpoint: URL + "/pusher/auth",
      });

      const userId = JSON.parse(localStorage.getItem("user"))._id;
      var channel = pusher.subscribe("private-" + userId);
      channel.bind("notification", function (data) {
        setNotificationsQueue((prev) => [data, ...prev]);
        console.log(data);
      });

      return () => {
        channel.unbind("notification");
        pusher.unsubscribe("private-" + userId);
      };
    }
  }, [isLogin, isShowOnBoarding]);

  useEffect(() => {
    if (notificationsQueue.length > 0) {
      const interval = setInterval(() => {
        const notification = notificationsQueue.shift(); // Take the first notification from the queue

        if (notification) {
          const toastId = toast(
            <Wrapper
              className="items-center !gap-4 relative"
              onClick={async () => {
                if (notification.redirectTo.modelType === "EVENT") {
                  if(notification.notificationType === "EVENT_MODIFICATION" || notification.notificationType === "EVENT_INVITATION"){
                    const eventResponse = await eventApi.getEvent(
                      notification.redirectTo.targetId
                    );
                    if (eventResponse.status !== 200) {
                      navigate("/error/This event no longer exist");
                      return;
                    } 
                    navigate(`/event/${notification.redirectTo.targetId}`)
                    return 
                  }
                  navigate("/error/This event no longer exist");
                }

                if (notification.redirectTo.modelType === "ITINERARY") {
                  if (notification.notificationType === "ITINERARY_MODIFICATION") {
                    navigate(
                      `/itinerary/details/${notification.redirectTo.targetId}`
                    );
                    return;
                  }
                  navigate(`/error/This itinerary no longer exist`);
                }
                setNotificationsQueue([]);
                toast.dismiss();
              }}
            >
              <img
                className="!w-[20px] !h-[20px] sm:w-10 sm:h-10"
                src={
                  ((notification.notificationType === "EVENT_MODIFICATION" ||
                    notification.notificationType === "EVENT_INVITATION" ||
                    notification.notificationType === "EVENT_DELETE") &&
                    planEvent ) ||
                  ((notification.notificationType ===
                    "ITINERARY_MODIFICATION" ||
                    notification.notificationType === "ITINERARY_DELETE") &&
                    map)
                }
              />
              <Text className="text-overflow-ellipsis-3-clamp !w-fit">{notification.content}</Text>
              <AiOutlineClose className="!w-[24px] !h-[24px]" onClick={(e) => {
                e.stopPropagation()
                toast.dismiss(toastId)
              }} />
            </Wrapper>,
            {
              duration: 3000,
              style: {
                cursor: "pointer",
              },
              position: viewport.width >= 660 ? 'bottom-right' : 'top-right'
            }
          );
        } else {
          clearInterval(interval);
          // setNotificationsQueue([]);
        }
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [notificationsQueue.length]);

  const loadMoreData = async (nextCursor) => {
    const now = Date.now();
    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 500) return;
    if (nextCursor === null) return;
    setLastFetch(now);

    const response = await notificationApi.getNotifications(nextCursor);
    let newList = [
      ...JSON.parse(localStorage.getItem("notifications")),
      ...response.data.results,
    ];
    setNotifications((prev) => [...prev, ...response.data.results]);
    localStorage.setItem("notifications", JSON.stringify(newList));
    setNotificationNextCursor(response.data.next_cursor);
    localStorage.setItem("notificationNextCursor", response.data.next_cursor);
  };

  useEffect(() => {
    if (!listRef.current) return;
    const handleScroll = async () => {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight - 300;

      if (isScrolledToBottom) {
        console.log("Scrolled to bottom!");
        const nextCursor = localStorage.getItem("notificationNextCursor");
        if (nextCursor.length > 10) {
          await loadMoreData(nextCursor);
        }
      }
    };

    listRef.current.addEventListener("scroll", handleScroll);
    return () => {
      if (listRef.current) {
        // Remember to remove event listener when the component is unmounted
        listRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMoreData]);

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

            {isLogin && !isShowOnBoarding && (
              <Wrapper
                _ref={notificationsRef}
                className="mr-4 items-center !absolute top-1/2 -translate-y-1/2 right-0 !gap-4"
              >
                {/* {isShowNotification && ( */}
                <div
                  onClick={() => {
                    setShowNotificationPopup((state) => !state);
                    getAllNotifications();
                    setUnseenNotificationCount(0);
                    setNotificationsQueue([]);
                  }}
                  className="relative"
                >
                  <Image
                    imageClassName=""
                    src={whiteNotification}
                    alt="notification"
                    className="w-[28px] h-[28px] mt-1 mr-0.5"
                  />
                  {(unseenNotificationCount > 0 ||
                    notificationsQueue.length > 0) && (
                    <BsFillCircleFill className="text-secondary-400 absolute top-0 right-0" />
                  )}
                  {showNotificationPopup &&
                    viewport.width > BREAK_POINT_NAVBAR && (
                      <>
                        <RxTriangleUp className="text-white absolute text-2xl translate-x-1/2 right-1/2" />

                        <Wrapper
                          _ref={listRef}
                          col="true"
                          className="bg-white !gap-0 max-h-[50vh] w-[600px] border-x border-b overflow-y-auto absolute translate-y-3 -right-4 shadow-lg drop-shadow-lg"
                        >
                          {notifications.map((notification, index) => {
                            return (
                              <NotificationCard
                                notification={notification}
                                onClick={async(e) => {
                                  e.stopPropagation();
                                  setShowNotificationPopup(false);
                                  if (notification.redirectTo.modelType === "EVENT") {
                                    if(notification.notificationType === "EVENT_MODIFICATION" || notification.notificationType === "EVENT_INVITATION"){
                                      const eventResponse = await eventApi.getEvent(
                                        notification.redirectTo.targetId
                                      );
                                      if (eventResponse.status !== 200) {
                                        navigate("/error/This event no longer exist");
                                        return;
                                      } 
                                      navigate(`/event/${notification.redirectTo.targetId}`)
                                      return 
                                    }
                                    navigate("/error/This event no longer exist");
                                  }
                  
                                  if (notification.redirectTo.modelType === "ITINERARY") {
                                    if (notification.notificationType === "ITINERARY_MODIFICATION") {
                                      navigate(
                                        `/itinerary/details/${notification.redirectTo.targetId}`
                                      );
                                      return;
                                    }
                                    navigate(`/error/This itinerary no longer exist`);
                                  }
                                }}
                                key={index}
                              />
                            );
                          })}
                        </Wrapper>
                      </>
                    )}
                </div>
                {/* )} */}

                <Button
                  onClick={() => setShowPopup(true)}
                  className={`!my-0  py-1.5 !border-danger !bg-danger !right-0`}
                  danger
                >
                  Log out
                </Button>
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
                      setShowNotificationPopup((state) => !state);
                      getAllNotifications();
                      setUnseenNotificationCount(0);
                      setNotificationsQueue([]);
                    }}
                  >
                    <Image
                      imageClassName=""
                      src={notification}
                      alt="notification"
                      className="w-[28px] h-[28px] mt-1 mr-0.5"
                    />
                    {/* <Counter count={10} /> */}
                    {(unseenNotificationCount > 0 ||
                      notificationsQueue.length > 0) && (
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
                _ref={listRef}
                col="true"
                className="pt-[40px] !gap-0 max-h-[100vh] overflow-y-auto notifications"
              >
                {notifications.map((notification, index) => {
                  return (
                    <NotificationCard
                      notification={notification}
                      onClick={async(e) => {
                        e.stopPropagation();
                        setShowNotificationPopup(false);
                        if (notification.redirectTo.modelType === "EVENT") {
                          if(notification.notificationType === "EVENT_MODIFICATION" || notification.notificationType === "EVENT_INVITATION"){
                            const eventResponse = await eventApi.getEvent(
                              notification.redirectTo.targetId
                            );
                            if (eventResponse.status !== 200) {
                              navigate("/error/This event no longer exist");
                              return;
                            } 
                            navigate(`/event/${notification.redirectTo.targetId}`)
                            return 
                          }
                          navigate("/error/This event no longer exist");
                        }
        
                        if (notification.redirectTo.modelType === "ITINERARY") {
                          if (notification.notificationType === "ITINERARY_MODIFICATION") {
                            navigate(
                              `/itinerary/details/${notification.redirectTo.targetId}`
                            );
                            return;
                          }
                          navigate(`/error/This itinerary no longer exist`);
                        }
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
