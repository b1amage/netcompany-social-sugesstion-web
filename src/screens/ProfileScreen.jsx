import React from "react";
import Screen from "@/components/container/Screen";
import Wrapper from "@/components/wrapper/Wrapper";
import Image from "@/components/image/Image";
import { DEFAULT } from "@/constants/defaultData";
import SubHeading from "@/components/typography/SubHeading";
import Heading from "@/components/typography/Heading";
import Button from "@/components/button/Button";
import TabView from "@/components/tab/TabView";

const ProfileScreen = () => {
  return (
    <Screen className="flex flex-col gap-5 px-3 py-4 lg:gap-10 md:px-6 md:py-5 lg:px-20">
      <Wrapper col="true">
        {/* Avatar */}
        <Wrapper col="true" className="w-full flex-center">
          <Image
            src={DEFAULT.avatar}
            alt="user avatar"
            className="w-[120px] h-[120px]"
          />
          <Wrapper col="true" className="gap-0 flex-center">
            <Heading>Bao Dep Trai</Heading>
            <SubHeading>s3877698@rmit.edu.vn</SubHeading>
          </Wrapper>
        </Wrapper>

        {/* Buttons */}
        <Wrapper className="flex-center">
          <Button className="!text-primary-800">Edit info</Button>
          <Button className="bg-red-400 ">Logout</Button>
        </Wrapper>
      </Wrapper>

      <Wrapper>
        {/* Tabs */}
        <TabView />
      </Wrapper>
    </Screen>
  );
};

export default ProfileScreen;
