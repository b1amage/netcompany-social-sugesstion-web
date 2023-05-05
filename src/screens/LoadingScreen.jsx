import React from "react";
import Loading from "@/components/loading/Loading";
import Screen from "@/components/container/Screen";

const LoadingScreen = () => {
  return (
    <Screen className="h-screen flex-center">
      <Loading />
    </Screen>
  );
};

export default LoadingScreen;
