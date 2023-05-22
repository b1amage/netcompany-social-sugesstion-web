import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
const VerifyScreen = React.lazy(() => import("@/screens/VerifyScreen"));
const LoadingScreen = React.lazy(() => import("@/screens/LoadingScreen"));
const HomeScreen = React.lazy(() => import("@/screens/HomeScreen"));
const LoginScreen = React.lazy(() => import("@/screens/LoginScreen"));
const NotFoundScreen = React.lazy(() => import("@/screens/404Screen"));
const MyRouteScreen = React.lazy(() => import("@/screens/MyRouteScreen"));
const AccountScreen = React.lazy(() => import("@/screens/AccountScreen"));
const PlanEventScreen = React.lazy(() => import("@/screens/PlanEventScreen"));
const MyEvent = React.lazy(() => import("@/screens/MyEvent"));
const Navbar = React.lazy(() => import("@/components/navbar/Navbar"));
const ProfileScreen = React.lazy(() => import("@/screens/ProfileScreen"));

// import VerifyScreen from "@/screens/VerifyScreen";
// import LoadingScreen from "@/screens/LoadingScreen";
// import HomeScreen from "@/screens/HomeScreen";
// import LoginScreen from "@/screens/LoginScreen";
// import NotFoundScreen from "@/screens/404Screen";
// import MyRouteScreen from "@/screens/MyRouteScreen";
// import AccountScreen from "@/screens/AccountScreen";
// import PlanEventScreen from "@/screens/PlanEventScreen";
// import MyEvent from "@/screens/MyEvent";
// import Navbar from "@/components/navbar/Navbar";
// import ProfileScreen from "@/screens/ProfileScreen";

const AppRoutes = () => {
  const [isLogin, setIsLogin] = useState(false)
  const user = JSON.parse(localStorage.getItem("user")) || null
  useEffect(() => {
    if (user){
      setIsLogin(true)
      return
    } else{
      setIsLogin(false)
    }
  }, [user, isLogin])
  return (
    <>
      {isLogin && <Navbar />}
      <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/verify" element={<VerifyScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
        <Route path="/account" element={<AccountScreen />} />
        <Route path="/plan-event" element={<PlanEventScreen />} />
        <Route path="/my-event" element={<MyEvent />} />
        <Route path="/my-route" element={<MyRouteScreen />} />
      </Routes>
    </Suspense>
    </>
    
  );
};

export default AppRoutes;
