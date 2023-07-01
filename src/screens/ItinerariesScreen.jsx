import Screen from "@/components/container/Screen";
import ItineraryCard from "@/components/card/ItineraryCard";
import React, { useEffect, useState } from "react";
import SubNavbar from "@/components/navbar/SubNavbar";
import { useSelector } from "react-redux";
import Wrapper from "@/components/wrapper/Wrapper";
import Heading from "@/components/typography/Heading";
import Button from "@/components/button/Button";
import Image from "@/components/image/Image";
import add from "@/assets/add.svg";
import itineraryApi from "@/api/itineraryApi";

const ItinerariesScreen = () => {
  const { user } = useSelector((state) => state.user);
  const [itineraries, setItineraries] = useState([])
  // const [nextCursor, setNextCursor] = useState()
  useEffect(() => {
    const getItineraryList = async() => {
      const response = await itineraryApi.getItineraries()
      // console.log(response)
      setItineraries(response.data.results)
      localStorage.setItem("itineraries", JSON.stringify(response.data.results))
      localStorage.setItem("itinerariesNextCursor", JSON.stringify(response.data.next_cursor))
    }
    getItineraryList()
  }, [])
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
      {itineraries.length > 0 && <Wrapper col="true" className="md:gap-8 gap-6">
        {itineraries.map((itinerary) => {
          return (<ItineraryCard key={itinerary._id}
          name={
            itinerary.name
          }
          numberOfLocations={itinerary.numOfLocations}
          createdAt={itinerary.createdAt}
        />)
        })}
      
      </Wrapper>}
    </Screen>
  );
};

export default ItinerariesScreen;
