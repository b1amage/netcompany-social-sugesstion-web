import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user") || JSON.stringify({});
    if (user === JSON.stringify({})) {
      navigate("/login");
    }
  }, []);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  console.log(process.env.NODE_ENV === "dev");
  return <div className="h-screen"></div>;
};

export default HomeScreen;
