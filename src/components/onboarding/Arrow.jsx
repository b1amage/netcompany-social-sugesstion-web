import Button from "@/components/button/Button";
import { useNavigate } from "react-router-dom";
import localStorageKey from "@/constants/localStorageKeys";
import ROUTE from "@/constants/routes";

const Arrow = ({ disabled, left, onClick }) => {
  const navigate = useNavigate();
  const disabeld = disabled ? " arrow--disabled hidden" : "";
  return !left && disabled ? (
    <Button
      onClick={() => {
        localStorage.setItem(localStorageKey.alreadyShownOnboarding, true);
        navigate(ROUTE.HOME);
      }}
      active
      className={`!m-0 flex-center !absolute bottom-8 cursor-pointer right-12 !border-0 !py-2`}
    >
      Get started
    </Button>
  ) : (
    <svg
      onClick={onClick}
      className={`arrow bg-secondary-400 rounded-full flex-center p-2 w-8 h-8 lg:w-10 lg:h-10 absolute bottom-8 fill-white cursor-pointer ${
        left ? "arrow--left left-2 hidden" : "arrow--right right-6"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
};

export default Arrow;
