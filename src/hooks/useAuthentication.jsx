import { useEffect, useState } from "react";
import localStorageKey from "@/constants/localStorageKeys";

const useAuthentication = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user") || null;
    const onBoardingAlreadyShown = localStorage.getItem(localStorageKey.alreadyShownOnboarding) || null
    

    console.log(onBoardingAlreadyShown )
    if (onBoardingAlreadyShown !== null  && user !== JSON.stringify({})) {
      setIsLogin(true);
    } 
    if (!user || !onBoardingAlreadyShown){
      setIsLogin(false);
    }
    console.log(isLogin)
    console.log(onBoardingAlreadyShown)

  }, []);
  
  return { isLogin };
};

export default useAuthentication;
