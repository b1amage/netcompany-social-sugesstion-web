import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "@/screens/LoadingScreen";
import AccountScreen from "@/screens/AccountScreen";
import PlanEventScreen from "@/screens/PlanEventScreen";
import MyEvent from "@/screens/MyEvent";
const HomeScreen = React.lazy(() => import("@/screens/HomeScreen"));
const NotFoundScreen = React.lazy(() => import("@/screens/404Screen"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
        <Route path="/account" element={<AccountScreen />} />
        <Route path="/plan-event" element={<PlanEventScreen />} />
        <Route path="/my-event" element={<MyEvent />} />
        
      </Routes>
    </Suspense>
  );
}

export default App;
