import Screen from "@/components/container/Screen";
import React from "react";

import Heading from "@/components/typography/Heading";
import LocationForm from "@/components/location/LocationForm";

const CreateLocationScreen = () => {
  return (
    <Screen className={`py-8 md:py-16 lg:py-0 location-form`}>
      <Heading className="w-full sm:text-center !text-[42px] leading-10">
        Register New Location
      </Heading>
      <LocationForm
        defaultImgList={[]}
        currentImg=""
        defaultPlaceId=""
        defaultTitle=""
        defaultAddress=""
        defaultDescription=""
        defaultCategory=""
        defaultWeekdayTime={{ openTime: "", closeTime: "" }}
        defaultWeekendTime={{ openTime: "", closeTime: "" }}
        defaultPriceRange={{ min: undefined, max: undefined, currency: localStorage.getItem("currentLocation") && JSON.parse(localStorage.getItem("currentLocation")).address_components[4].long_name === "Vietnam"  ? {title: "VND"} : {title: "USD"}}}
      />
    </Screen>
  );
};

export default CreateLocationScreen;
