import Screen from "@/components/container/Screen";
import React from "react";
import StaticMap from "@/test/StaticMap";

const TestScreen = () => {
  return (
    <Screen>
      <StaticMap
        title="Netcompany"
        width={500}
        height={300}
        address="92 Nguyen Huu Canh"
      />
    </Screen>
  );
};

export default TestScreen;
