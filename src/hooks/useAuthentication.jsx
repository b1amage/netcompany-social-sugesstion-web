import { useEffect, useState } from "react";
import localStorageKey from "@/constants/localStorageKeys";
import { useNavigate } from "react-router-dom";
import ROUTE from "@/constants/routes";

const useAuthentication = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isShowOnBoarding, setIsShowOnBoarding] = useState()
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem("user") || null;
    // const onBoardingAlreadyShown = localStorage.getItem(localStorageKey.alreadyShownOnboarding) || null
    
    // console.log(onBoardingAlreadyShown )
    if (user && user !== JSON.stringify({})) {
      if (JSON.parse(user)?.isVerified){
        setIsLogin(true);
        setIsShowOnBoarding(false)
        // navigate(ROUTE.HOME)
        return
      } else{
        setIsLogin(true);
        setIsShowOnBoarding(true)
        return
        // navigate(ROUTE.ONBOARDING)
      }
    } 
    else{
      if(localStorage.getItem("idToken")){
        setIsLogin(true);
        setIsShowOnBoarding(true)
        return
      } else{
        setIsLogin(false);
        setIsShowOnBoarding(false)
        return
      }
      // navigate(ROUTE.LOGIN)
    }
  }, [localStorage.getItem("idToken")]);
  
  return { isLogin, isShowOnBoarding };
};

export default useAuthentication;
