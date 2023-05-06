import Button from "@/components/button/Button";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const HomeScreen = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user);
  console.log(process.env.NODE_ENV === "dev");
  return <div className="h-screen">
    <Button secondary active>Hello</Button>
  </div>;
};

export default HomeScreen;
