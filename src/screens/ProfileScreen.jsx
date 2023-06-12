import React, { useEffect, useState } from "react";
import Screen from "@/components/container/Screen";
import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import { DEFAULT } from "@/constants/defaultData";
import SubHeading from "@/components/typography/SubHeading";
import Heading from "@/components/typography/Heading";
import Button from "@/components/button/Button";
import TabView from "@/components/tab/TabView";
import { useSelector } from "react-redux";
import userApi from "@/api/userApi";
import emptyLogin from "@/assets/profile/empty.svg";
import { Link, useNavigate } from "react-router-dom";
import ROUTE from "@/constants/routes";
import { useDispatch } from "react-redux";
import { logout } from "@/features/userSlice";
import Popup from "@/components/popup/Popup";
import LoadingScreen from "./LoadingScreen";
import { BsPencilFill } from "react-icons/bs";
import Text from "@/components/typography/Text";
import { MdLocationOn, MdOutlineFavorite } from "react-icons/md";
import Category from "@/components/category/Category";
import useViewport from "@/hooks/useScreenWidth";

const UnLoginUI = () => (
  <Wrapper className="flex-1 px-5 flex-center !gap-10" col="true">
    <Image src={emptyLogin} className="w-[200px] h-[200px]" />
    <Wrapper col="true" className="!gap-1">
      <Heading className="text-center">
        You have not login yet, please login to view your profile
      </Heading>
      <Link to={ROUTE.LOGIN}>
        <Button primary active>
          Go to login
        </Button>
      </Link>
    </Wrapper>
  </Wrapper>
);

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const { username, email, imageUrl, _id } = user;
  const [showPopup, setShowPopup] = useState(false);
  // const [userInfo, setUserInfo] = useState(user);
  const [fetchUser, setFetchUser] = useState(user);
  const [loading, setLoading] = useState(true);
  const {width} = useViewport()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closePopup = () => setShowPopup(false);
  const confirmLogout = () => {
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

  useEffect(() => {
    const getUserProfile = async () => {
      const response = await userApi.getUserProfile(_id);
      console.log(response);
      setFetchUser(response.data);
      setLoading(false);
      return response;
    };
    if (_id) {
      getUserProfile();
    }
  }, []);

  return (
    <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
      {showPopup && (
        <Popup
          onClose={closePopup}
          title="Are you sure you want to logout Netcompany Suggestion System"
          actions={popupActions}
        />
      )}
      {!_id ? (
        <UnLoginUI />
      ) : (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <Wrapper col="true">
                {/* Avatar */}
                <Wrapper col="true" className="w-full flex-center relative">
                  <Image
                    src={fetchUser?.imageUrl || imageUrl || DEFAULT.avatar}
                    alt="user avatar"
                    className="w-[120px] h-[120px] overflow-hidden !rounded-full"
                  />
                  <Wrapper col="true" className="gap-0 flex-center">
                    <Heading>{fetchUser?.username}</Heading>
                    <SubHeading>{fetchUser?.email}</SubHeading>
                  </Wrapper>

                  <Wrapper className={`flex-center absolute top-0 right-0 ${width > 768 ? "block" : "hidden"}`}>
                    <Button
                      onClick={() => navigate(ROUTE.EDIT_PROFILE)}
                      className="!text-primary-800 !my-0  !relative !gap-2"
                    >
                      <BsPencilFill />
                      <span className="capitalize">
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
                </Wrapper>

                {/* Relevant info */}
                <Wrapper col="true" className="flex-center">
                  <Wrapper className="flex-center">
                    <MdLocationOn className="text-xl" />
                    <Text>
                      Search distance:{" "}
                      <span className="font-bold">
                        {fetchUser.searchDistance}
                      </span>
                      <span className="font-bold">km</span>
                    </Text>
                  </Wrapper>

                  <Wrapper className="flex-wrap flex-center">
                    {fetchUser.locationCategories.length > 0 ? (
                      fetchUser.locationCategories.map((item, index) => (
                        <Category
                          disableHover="true"
                          className="cursor-none hover:bg-primary-400 hover:!opacity-0"
                          onClick={() => {}}
                          isActive
                          key={index}
                        >
                          {item}
                        </Category>
                      ))
                    ) : (
                      <Text>No preferences yet!</Text>
                    )}
                  </Wrapper>
                </Wrapper>
              </Wrapper>

              <Wrapper>
                {/* Tabs */}
                <TabView />
              </Wrapper>
            </>
          )}
        </>
      )}
    </Screen>
  );
};

export default ProfileScreen;
