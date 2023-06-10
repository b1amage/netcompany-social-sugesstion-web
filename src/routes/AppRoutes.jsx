import React, { Suspense, useState, useEffect } from "react";
import ROUTE from "@/constants/routes";
import { Routes, Route } from "react-router-dom";
import localStorageKey from "@/constants/localStorageKeys";
const CreateLocationScreen = React.lazy(() =>
  import("@/screens/CreateLocationScreen")
);
const OnboardingScreen = React.lazy(() => import("@/screens/OnboardingScreen"));
const AutoCompleteScreen = React.lazy(() => import("@/test/AutoComplete"));
const VerifyScreen = React.lazy(() => import("@/screens/VerifyScreen"));
const LoadingScreen = React.lazy(() => import("@/screens/LoadingScreen"));
const HomeScreen = React.lazy(() => import("@/screens/HomeScreen"));
const LoginScreen = React.lazy(() => import("@/screens/LoginScreen"));
const NotFoundScreen = React.lazy(() => import("@/screens/404Screen"));
const MyRouteScreen = React.lazy(() => import("@/screens/MyRouteScreen"));
const PlanEventScreen = React.lazy(() => import("@/screens/PlanEventScreen"));
const MyEvent = React.lazy(() => import("@/screens/MyEvent"));
const Navbar = React.lazy(() => import("@/components/navbar/Navbar"));
const ProfileScreen = React.lazy(() => import("@/screens/ProfileScreen"));
const TestScreen = React.lazy(() => import("@/screens/TestScreen"));
const EventsScreen = React.lazy(() => import("@/screens/EventsScreen"));
const DetailsScreen = React.lazy(() => import("@/screens/DetailsScreen"));
const EditProfileScreen = React.lazy(() =>
  import("@/screens/EditProfileScreen")
);

const AppRoutes = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isShowNavbar, setIsShowNavbar] = useState(false)
  const user = JSON.parse(localStorage.getItem("user")) || null;
  useEffect(() => {
    const onBoardingAlreadyShown = JSON.parse(
      localStorage.getItem(localStorageKey.alreadyShownOnboarding)
    );
    console.log(onBoardingAlreadyShown)
    if (user) {
      if(onBoardingAlreadyShown){
        setIsShowNavbar(true);
      };
      setIsLogin(true)
    } else {
      setIsLogin(false)
      setIsShowNavbar(false);
    }
  }, [user, isLogin])
  return (
    <>
      {isShowNavbar && <Navbar />}
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path={ROUTE.ONBOARDING} element={<OnboardingScreen />} />
          <Route path={ROUTE.HOME} element={<HomeScreen />} />
          <Route path={ROUTE.LOGIN} element={<LoginScreen />} />
          <Route path={ROUTE.VERIFY} element={<VerifyScreen />} />
          <Route path={ROUTE.PROFILE} element={<ProfileScreen />} />

          <Route path="/plan-event" element={<PlanEventScreen />} />
          <Route path="/my-event" element={<MyEvent />} />
          <Route path="/my-route" element={<MyRouteScreen />} />

          <Route path="/atc" element={<AutoCompleteScreen />} />
          <Route path={ROUTE.TEST} element={<TestScreen />} />
          <Route path={ROUTE.EVENTS} element={<EventsScreen />} />
          <Route
            path={ROUTE.DETAILS_EVENT}
            element={<DetailsScreen event="true" />}
          />
          <Route path={ROUTE.DETAILS_LOCATION} element={<DetailsScreen />} />
          <Route
            path={ROUTE.CREATE_LOCATION}
            element={<CreateLocationScreen />}
          />
          <Route path={ROUTE.NOT_FOUND} element={<NotFoundScreen />} />
          <Route path={ROUTE.EDIT_PROFILE} element={<EditProfileScreen />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
