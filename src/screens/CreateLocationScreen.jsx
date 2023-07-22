import Screen from "@/components/container/Screen";
import React from "react";

import Heading from "@/components/typography/Heading";
import LocationForm from "@/components/location/LocationForm";

const CreateLocationScreen = () => {
  return (
    <Screen className={`flex flex-col  px-3 py-4 gap-6 md:gap-4 md:px-6 md:py-5 !mb-0 !rounded-none lg:px-20 !min-h-0 location-form`}>
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
        defaultPriceRange={{ min: undefined, max: undefined, currency: undefined}}
      />
    </Screen>
  );
};

export default CreateLocationScreen;