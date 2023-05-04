import User from "@/components/user/User";
import PlaceCard from "@/components/card/PlaceCard";
import placeList from "@/constants/mockPlaces";
import React from "react";
import generateId from "@/utilities/generateId";

const HomeScreen = () => {
  return (
    <div className="h-screen">
      <User
        src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80"
        user={{ name: "An Bui", email: "quangan186@gmail.com" }}
      />
    </div>
  );
};

export default HomeScreen;
