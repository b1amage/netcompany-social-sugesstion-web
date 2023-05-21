import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  // ONBOARDING CHECK
  useEffect(() => {
    const onBoardingAlreadyShown = JSON.parse(
      localStorage.getItem(localStorageKey.alreadyShownOnboarding)
    );

    !onBoardingAlreadyShown && navigate(ROUTE.ONBOARDING);
  }, []);

  // LOGIN CHECK
  useEffect(() => {
    const user =
      localStorage.getItem(localStorageKey.user) || JSON.stringify({});
    if (user === JSON.stringify({})) {
      navigate(ROUTE.LOGIN);
    }
  }, []);
  const { user } = useSelector((state) => state.user);
  console.log(user);

  return <div className="h-screen"></div>;
};

export default HomeScreen;
