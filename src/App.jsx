import React from "react";
import { Routes, Route } from "react-router-dom";
const ButtonScreen = React.lazy(() => import("@/screens/ButtonScreen"));
const HomeScreen = React.lazy(() => import("@/screens/HomeScreen"));
const NotFoundScreen = React.lazy(() => import("@/screens/404Screen"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
      <Route path="/buttons" element={<ButtonScreen />} />
    </Routes>
  );
}

export default App;
