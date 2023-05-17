import React, { useState } from "react";
import profileTabs from "@/constants/ProfileTabs";
import Wrapper from "@/components/wrapper/Wrapper";
import Tab from "./Tab";
import PlaceCard from "@/components/card/PlaceCard";
import placeList from "@/constants/mockPlaces";
import shuffleArray from "@/utilities/shuffleArray";
import TabHeader from "./TabHeader";
import ProfileCard from "@/components/card/ProfileCard";

const TabView = () => {
  const [tabs, setTabs] = useState(profileTabs);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [places, setPlaces] = useState(placeList);
  const renderCards = () => {
    return places.map((place, index) => (
      <ProfileCard key={index} place={place} />
    ));
  };

  const renderTabContent = (index) => {
    switch (index) {
      case 0:
        return <Tab>{renderCards()}</Tab>;
      case 1:
        return <Tab>{renderCards()}</Tab>;
      case 2:
        return <Tab>{renderCards()}</Tab>;
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
      <div className="flex items-center justify-between w-full">
        {tabs.map((Item, index) => (
          <TabHeader
            key={index}
            id={index}
            onClick={onTabClick}
            isActive={index === activeTabIndex}
          >
            {<Item.icon id={index} className="w-full" />}
          </TabHeader>
        ))}
      </div>
      {renderTabContent(activeTabIndex)}
    </Wrapper>
  );
};

export default TabView;
