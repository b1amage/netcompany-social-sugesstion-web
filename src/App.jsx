import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const LoadingScreen = React.lazy(() => import("@/screens/LoadingScreen"));
const HomeScreen = React.lazy(() => import("@/screens/HomeScreen"));
const LoginScreen = React.lazy(() => import("@/screens/LoginScreen"));
const NotFoundScreen = React.lazy(() => import("@/screens/404Screen"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Suspense>
  );
}

export default App;
