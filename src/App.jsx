import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const ButtonScreen = React.lazy(() => import("@/screens/ButtonScreen"));
import LoadingScreen from "@/screens/LoadingScreen";
const HomeScreen = React.lazy(() => import("@/screens/HomeScreen"));
const NotFoundScreen = React.lazy(() => import("@/screens/404Screen"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
        <Route path="/buttons" element={<ButtonScreen />} />
      </Routes>
    </Suspense>
  );
}

export default App;
