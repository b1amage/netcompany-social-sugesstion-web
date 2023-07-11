import Screen from "@/components/container/Screen";
import SubNavbar from "@/components/navbar/SubNavbar";
import Heading from "@/components/typography/Heading";
import SubHeading from "@/components/typography/SubHeading";
import Image from "@/components/image/Image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Wrapper from "@/components/wrapper/Wrapper";
import Label from "@/components/form/Label";
import Button from "@/components/button/Button";
import { BsFillPencilFill } from "react-icons/bs";

const ItineraryLocationDetailsScreen = () => {
  const place = useLocation();
  useEffect(() => {
    console.log(place.state.location);
  }, []);
  const { user } = useSelector((state) => state.user);

  return (
    <Screen className="flex flex-col  px-3 py-4 gap-6 md:gap-4 md:px-6 md:py-5 !rounded-none lg:px-20 !min-h-0">
      <SubNavbar user={user} />
      <Heading className="!text-[32px]">
        {place.state.location.location.name}
      </Heading>
      <Image src={place.state.location.location.imageUrls[0]} />
      <Wrapper col="true" className="">
        <Heading className="!px-0 !text-[28px] items-center flex gap-2">
          Description
          <Button
            onClick={() => {
              // navigate(`/location/edit/${id}`);
              // editItinerary(itinerary)

              console.log("Edit!");
            }}
            className="!bg-transparent !border-none !bg-opacity-40 !text-black !h-fit !my-0 !p-2"
          >
            <BsFillPencilFill className="text-sm" />
          </Button>
        </Heading>
        <SubHeading className="">{place.state.location.note}</SubHeading>
      </Wrapper>
    </Screen>
  );
};

export default ItineraryLocationDetailsScreen;
