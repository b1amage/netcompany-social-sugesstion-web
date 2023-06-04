import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";
import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "@/components/popup/Popup";

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

  const [isShowModal, setIsShowModal] = useState(false);
  const body = document.getElementsByTagName("BODY")[0];
  return (
    <div className="h-screen">
      <Button
        className=""
        active
        primary
        onClick={() => {
          setIsShowModal(true);
          body.style.overflow = "hidden";
          body.style.height = "100vh";
        }}
      >
        Open modal
      </Button>
      {isShowModal && (
        <Popup
          title="Are you sure to logout Net Social Suggestion?"
          onClose={() => setIsShowModal(false)}
        />
      )}
    </div>
  );
};

export default HomeScreen;
