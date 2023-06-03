import React, { useEffect } from "react";
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserProfile = async () => {
      await userApi.getUserProfile(_id);
    };
    _id && getUserProfile();
  }, []);
  return (
    <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
      {!_id ? (
        <UnLoginUI />
      ) : (
        <>
          <Wrapper col="true">
            {/* Avatar */}
            <Wrapper col="true" className="w-full flex-center">
              <Image
                src={imageUrl || DEFAULT.avatar}
                alt="user avatar"
                className="w-[120px] h-[120px] overflow-hidden !rounded-full"
              />
              <Wrapper col="true" className="gap-0 flex-center">
                <Heading>{username}</Heading>
                <SubHeading>{email}</SubHeading>
              </Wrapper>
            </Wrapper>

            {/* Buttons */}
            <Wrapper className="flex-center">
              <Button className="!text-primary-800">Edit info</Button>
              <Button
                className="bg-red-400 "
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}
              >
                Logout
              </Button>
            </Wrapper>
          </Wrapper>

          <Wrapper>
            {/* Tabs */}
            <TabView />
          </Wrapper>
        </>
      )}
    </Screen>
  );
};

export default ProfileScreen;
