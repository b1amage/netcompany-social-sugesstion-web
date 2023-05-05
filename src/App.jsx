import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const MyRouteScreen = React.lazy(() => import("@/screens/MyRouteScreen"));
const LoadingScreen = React.lazy(() => import("@/screens/LoadingScreen"));
const AccountScreen = React.lazy(() => import("@/screens/AccountScreen"));
const PlanEventScreen = React.lazy(() => import("@/screens/PlanEventScreen"));
const MyEvent = React.lazy(() => import("@/screens/MyEvent"));
const Navbar = React.lazy(() => import("@/components/navbar/Navbar"));
const HomeScreen = React.lazy(() => import("@/screens/HomeScreen"));
const NotFoundScreen = React.lazy(() => import("@/screens/404Screen"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
        <Route path="/account" element={<AccountScreen />} />
        <Route path="/plan-event" element={<PlanEventScreen />} />
        <Route path="/my-event" element={<MyEvent />} />
        <Route path="/my-route" element={<MyRouteScreen />} />
      </Routes>
    </Suspense>
  );
}

export default App;
