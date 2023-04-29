import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "@/screens/LoadingScreen";
const HomeScreen = React.lazy(() => import("@/screens/HomeScreen"));
const NotFoundScreen = React.lazy(() => import("@/screens/404Screen"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Suspense>
  );
}

export default App;
