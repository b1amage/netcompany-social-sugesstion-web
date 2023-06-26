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
import { useNavigate } from "react-router-dom";
import Text from "@/components/typography/Text";
import { AiOutlinePlusCircle } from "react-icons/ai";
const EmptyTab = ({ title, actionName, action }) => (
  <Tab className="!flex w-full h-full flex-center xl:my-20">
    <Wrapper col="true">
      <Image className="!w-[200px] !h-[200px] mx-auto" src={emptyPost} />

      <Wrapper col="true">
        <Heading className="!text-center">{title}</Heading>
        <Button onClick={action} active primary className="!capitalize">
          {actionName}
        </Button>
      </Wrapper>
    </Wrapper>
  </Tab>
);

const TabView = () => {
  const [tabType, setTabType] = useState("created");
  const [lastFetch, setLastFetch] = useState(Date.now());
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [places, setPlaces] = useState(placeList);
  const [createdPlaces, setCreatedPlaces] = useState(
    (localStorage.getItem("createdPlaces") &&
      JSON.parse(localStorage.getItem("createdPlaces"))) ||
      []
  );

  const [likedPlaces, setLikedPlaces] = useState(
    (localStorage.getItem("likedPlaces") &&
      JSON.parse(localStorage.getItem("likedPlaces"))) ||
      []
  );

  const [loading, setLoading] = useState(true);
  const [createdNextCursor, setCreatedNextCursor] = useState(undefined);
  const [creaLikedCursor, setLikedNextCursor] = useState(undefined);
  const [nextLoading, setNextLoading] = useState(false);
  const navigate = useNavigate();

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
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 1000) return;
    if (createdNextCursor === null) return;
    setNextLoading(true);
    setLastFetch(now);
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

  useEffect(() => {
    const getLikedLocation = async () => {
      const response = await userApi.getLikedLocation();
      console.log(response);
      setLikedPlaces(response.data.results);
      localStorage.setItem(
        "likedPlaces",
        JSON.stringify(response.data.results)
      );
      localStorage.setItem("likedNextCursor", response.data.next_cursor);
      setLikedNextCursor(response.data.next_cursor);
      setLoading(false);
    };
    getLikedLocation();
  }, []);

  const loadMoreLikedLocation = async (likedNextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 1000) return;
    if (likedNextCursor === null) return;
    setNextLoading(true);
    setLastFetch(now);
    const response = await userApi.getLikedLocation(likedNextCursor);
    // console.log(response.data);

    const newLikedPlaces = [
      ...JSON.parse(localStorage.getItem("likedPlaces")),
      ...response.data.results,
    ];
    localStorage.setItem("likedPlaces", JSON.stringify(newLikedPlaces));
    setLikedPlaces(newLikedPlaces);
    localStorage.setItem("likedNextCursor", response.data.next_cursor);
    setLikedNextCursor(response.data.next_cursor);
    setNextLoading(false);
  };

  const renderCards = (places, type) => {
    const results =
      places.length === 0 ? (
        <EmptyTab
          title={
            type === "created"
              ? "You have no post yet!"
              : "You have not liked any location yet!"
          }
          actionName={
            type === "created"
              ? "Register new location"
              : "Explore more location"
          }
          action={() =>
            navigate(type === "created" ? ROUTE.CREATE_LOCATION : "/")
          }
        />
      ) : (
        <Tab
          activeTabIndex={activeTabIndex}
          loadMore={
            activeTabIndex === 0 ? loadMoreLocation : loadMoreLikedLocation
          }
        >
          {loading ? (
            <Wrapper className="absolute w-full flex-center">
              <Loading />
            </Wrapper>
          ) : (
            <>
              {type === "created" && (
                <Wrapper
                  onClick={() => navigate("/create-location")}
                  className="hover:bg-opacity-10 transition-all flex-center cursor-pointer w-[160px] h-[230px] md:w-full md:h-[180px] xl:max-w-[400px] xl:h-[200px] bg-neutral-400 bg-opacity-30 rounded-lg border-2 border-dashed border-primary-400"
                >
                  <AiOutlinePlusCircle className="text-4xl text-primary-400" />
                </Wrapper>
              )}
              {places.map((place, index) => (
                <ProfileCard key={index} place={place} />
              ))}
            </>
          )}
        </Tab>
      );

    return results;
  };

  const renderTabContent = (index) => {
    switch (index) {
      case 0:
        return renderCards(createdPlaces, "created");
      case 1:
        return renderCards(likedPlaces, "liked");
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
      <div className="flex items-center justify-center w-full gap-5">
        {profileTabs.map((Item, index) => (
          <TabHeader
            key={generateId()}
            id={index}
            onClick={onTabClick}
            active={index === activeTabIndex ? "true" : undefined}
          >
            {index === activeTabIndex ? (
              <Wrapper id={index} className="items-center gap-2">
                <Item.fillIcon id={index} className="w-full"></Item.fillIcon>
                <Text
                  id={index}
                  className="hidden lg:block !text-base capitalize"
                >
                  {Item.title}
                </Text>
              </Wrapper>
            ) : (
              <Wrapper id={index} className="items-center gap-2">
                <Item.icon id={index} className="w-full" />
                <Text
                  id={index}
                  className="hidden lg:block !text-base capitalize"
                >
                  {Item.title}
                </Text>
              </Wrapper>
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
