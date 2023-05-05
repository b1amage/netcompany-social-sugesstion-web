import React from "react";
import { useSelector, useDispatch } from "react-redux";

const HomeScreen = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  return <div className="h-screen"></div>;
};

export default HomeScreen;
