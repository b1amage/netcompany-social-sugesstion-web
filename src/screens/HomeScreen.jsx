import PlaceCard from "@/components/card/PlaceCard";
import placeList from "@/constants/mockPlaces";
import React from "react";
import generateId from "@/utilities/generateId";

const HomeScreen = () => {
  return (
    <div className="grid gap-5 lg:grid-cols-3 place-items-center">
      {placeList.map((place) => (
        <PlaceCard key={generateId()} place={place} />
      ))}
    </div>
  );
};

export default HomeScreen;
