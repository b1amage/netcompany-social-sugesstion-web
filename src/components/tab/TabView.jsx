import React, { useState } from "react";
import profileTabs from "@/constants/ProfileTabs";
import Wrapper from "@/components/wrapper/Wrapper";
import Tab from "./Tab";
import TabHeader from "./TabHeader";
import placeList from "@/constants/mockPlaces";
import shuffleArray from "@/utilities/shuffleArray";
import ProfileCard from "@/components/card/ProfileCard";
import generateId from "@/utilities/generateId";

const TabView = () => {
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
      {/* Tab Header */}
      <div className="flex items-center justify-between w-full">
        {profileTabs.map((Item, index) => (
          <TabHeader
            key={generateId()}
            id={index}
            onClick={onTabClick}
            isActive={index === activeTabIndex}
          >
            {<Item.icon id={index} className="w-full" />}
          </TabHeader>
        ))}
      </div>
      {/* Tab Content */}
      {renderTabContent(activeTabIndex)}
    </Wrapper>
  );
};

export default TabView;
