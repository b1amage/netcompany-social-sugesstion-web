import React, { useState, useEffect } from "react";
import profileTabs from "@/constants/ProfileTabs";
import Wrapper from "@/components/wrapper/Wrapper";
import Tab from "./Tab";
import TabHeader from "./TabHeader";
import placeList from "@/constants/mockPlaces";
import shuffleArray from "@/utilities/shuffleArray";
import ProfileCard from "@/components/card/ProfileCard";
import generateId from "@/utilities/generateId";
import emptyPost from "@/assets/profile/emptyPost.svg";
import Image from "@/components/image/Image";
import Heading from "@/components/typography/Heading";
import Button from "@/components/button/Button";
import userApi from "@/api/userApi";
import Loading from "@/components/loading/Loading";

const EmptyTab = ({ title, actionName }) => (
  <Tab className="flex w-full h-full flex-center xl:my-20">
    <Wrapper col="true">
      <Image src={emptyPost} />

      <Wrapper col="true">
        <Heading>{title}</Heading>
        <Button active primary>
          {actionName}
        </Button>
      </Wrapper>
    </Wrapper>
  </Tab>
);

const TabView = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [places, setPlaces] = useState(placeList);
  const [createdPlaces, setCreatedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCreatedLocation = async () => {
      const data = await userApi.getCreatedLocation();
      console.log(data);
      setCreatedPlaces(data.results);
      setLoading(false);
    };
    getCreatedLocation();
  }, []);

  const renderCards = (places) => {
    return places.length === 0 ? (
      <EmptyTab title="You have no post yet!" actionName="Create Post" />
    ) : (
      <Tab>
        {loading ? (
          <Loading />
        ) : (
          places.map((place, index) => (
            <ProfileCard key={index} place={place} />
          ))
        )}
      </Tab>
    );
  };

  const renderTabContent = (index) => {
    switch (index) {
      case 0:
        return renderCards(createdPlaces);
      case 1:
        return renderCards(createdPlaces);
      case 2:
        return renderCards(createdPlaces);
      default:
        return <Tab>Tab 404</Tab>;
    }
  };

  const onTabClick = (e) => {
    setActiveTabIndex(Number(e.target.id));
    // Mock data
    const mockPlaces = shuffleArray(placeList);
    setPlaces(mockPlaces);
  };

  return (
    <Wrapper col="true" className="w-full">
      {/* Tab Header */}
      <div className="flex items-center justify-between w-full">
        {profileTabs.map((Item, index) => (
          <TabHeader
            key={generateId()}
            id={index}
            onClick={onTabClick}
            active={index === activeTabIndex ? "true" : undefined}
          >
            {index === activeTabIndex ? (
              <Item.fillIcon id={index} className="w-full"></Item.fillIcon>
            ) : (
              <Item.icon id={index} className="w-full" />
            )}
          </TabHeader>
        ))}
      </div>
      {/* Tab Content */}
      {renderTabContent(activeTabIndex)}
    </Wrapper>
  );
};

export default TabView;
