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
import ROUTE from "@/constants/routes";

const EmptyTab = ({ title, actionName, action }) => (
  <Tab className="!flex w-full h-full flex-center xl:my-20">
    <Wrapper col="true">
      <Image src={emptyPost} />

      <Wrapper col="true">
        <Heading>{title}</Heading>
        <Button onClick={action} active primary className="!capitalize">
          {actionName}
        </Button>
      </Wrapper>
    </Wrapper>
  </Tab>
);

const TabView = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [places, setPlaces] = useState(placeList);
  const [createdPlaces, setCreatedPlaces] = useState(
    (localStorage.getItem("createdPlaces") &&
      JSON.parse(localStorage.getItem("createdPlaces"))) ||
      []
  );
  const [loading, setLoading] = useState(true);
  const [createdNextCursor, setCreatedNextCursor] = useState(undefined);
  const [nextLoading, setNextLoading] = useState(false);

  useEffect(() => {
    const getCreatedLocation = async () => {
      const response = await userApi.getCreatedLocation();
      console.log(response);
      setCreatedPlaces(response.data.results);
      localStorage.setItem(
        "createdPlaces",
        JSON.stringify(response.data.results)
      );
      localStorage.setItem("createdNextCursor", response.data.next_cursor);
      setCreatedNextCursor(response.data.next_cursor);
      setLoading(false);
    };
    getCreatedLocation();
  }, []);

  const loadMoreLocation = async (createdNextCursor) => {
    if (createdNextCursor === null) return;
    setNextLoading(true);
    const response = await userApi.getCreatedLocation(createdNextCursor);
    // console.log(response.data);

    const newCreatedPlaces = [
      ...JSON.parse(localStorage.getItem("createdPlaces")),
      ...response.data.results,
    ];
    localStorage.setItem("createdPlaces", JSON.stringify(newCreatedPlaces));
    setCreatedPlaces(newCreatedPlaces);
    localStorage.setItem("createdNextCursor", response.data.next_cursor);
    setCreatedNextCursor(response.data.next_cursor);
    setNextLoading(false);
  };

  const renderCards = (places) => {
    return places.length === 0 ? (
      <EmptyTab
        title="You have no post yet!"
        actionName="Register new location"
        action={() => navigate(ROUTE.CREATE_LOCATION)}
      />
    ) : (
      <Tab loadMore={loadMoreLocation}>
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
    setPlaces(createdPlaces);
  };

  return (
    <Wrapper col="true" className="w-full realtive">
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

      {nextLoading && (
        <div className="w-full my-4 flex-center">
          <Loading />
        </div>
      )}
    </Wrapper>
  );
};

export default TabView;
