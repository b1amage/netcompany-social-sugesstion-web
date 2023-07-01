import Screen from "@/components/container/Screen";
import ItineraryCard from "@/components/card/ItineraryCard";
import React from "react";
import SubNavbar from "@/components/navbar/SubNavbar";
import { useSelector } from "react-redux";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import Button from "@/components/button/Button";
import Image from "@/components/image/Image";
import add from "@/assets/add.svg";

const ItinerariesScreen = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Screen className="flex flex-col  px-3 py-4 gap-6 md:gap-4 md:px-6 md:py-5 lg:px-20 !min-h-0">
      <SubNavbar user={user} wrapperClassName="!gap-0" />
      <Wrapper className="md:justify-between md:items-center items-start">
        <Heading className="!text-[28px]">My itineraries</Heading>
        <Button
          onClick={() => {
            // navigate("/create-location");
            console.log("Create!");
          }}
          active
          className="md:!w-[250px] flex justify-evenly gap-2 h-[60px] !rounded-2xl !fixed md:!static z-[4000] right-4 !w-[250px] bottom-4 border-primary-400"
        >
          <Image
            imageClassName=""
            src={add}
            alt="add"
            className="w-[28px] h-[28px]"
          />
          Create new itinerary
        </Button>
      </Wrapper>
      <Wrapper col="true" className="md:gap-8 gap-6">
        <ItineraryCard
          name={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
          numberOfLocations={11}
          createdAt="August 29, 2023"
        />
        <ItineraryCard
          name={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
          numberOfLocations={11}
          createdAt="August 29, 2023"
        />

        <ItineraryCard
          name={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          }
          numberOfLocations={11}
          createdAt="August 29, 2023"
        />

<ItineraryCard name={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."} numberOfLocations={11} createdAt="August 29, 2023" />

      </Wrapper>
    </Screen>
  );
};

export default ItinerariesScreen;
