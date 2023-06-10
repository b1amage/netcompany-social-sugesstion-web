import Screen from "@/components/container/Screen";
import React from "react";
import StaticMap from "@/test/StaticMap";
import AutoCompleteScreen from "@/test/AutoComplete";

const TestScreen = () => {
  return (
    <Screen>
      <StaticMap
        title="Rmit"
        width={500}
        height={300}
        address="720 Nguyen Van Linh"
        lat={10.7289515}
        lng={106.6957667}
      />
      {/* <AutoCompleteScreen /> */}
    </Screen>
  );
};

export default TestScreen;
