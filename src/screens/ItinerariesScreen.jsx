import Screen from "@/components/container/Screen";
import ItineraryCard from "@/components/card/ItineraryCard";
import React, { useEffect, useRef, useState } from "react";
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
  const [lastFetch, setLastFetch] = useState()
  const tabRef = useRef()

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

  const loadMoreData = async(nextCursor) => {
    const now = Date.now();

    // Debounce: if less than 1000ms (1s) has passed since the last fetch, do nothing
    if (now - lastFetch < 1000) return;
    if (nextCursor === null) return;
    // setIsLatestUpdating(true);
    setLastFetch(now);

    const response = await itineraryApi.getItineraries(nextCursor)
    let newList = [...JSON.parse(localStorage.getItem("itineraries")), ...response.data.results]
    setItineraries(newList)
    localStorage.setItem("itineraries", newList)
    localStorage.setItem("itinerariesNextCursor", response.data.next_cursor)
  }
  useEffect(() => {
    if (!tabRef.current) return;
    const handleScroll = async () => {
      const { scrollTop, scrollHeight, clientHeight } = tabRef.current;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;
      
      if (isScrolledToBottom) {
        console.log("Scrolled to bottom!");
        const nextCursor = localStorage.getItem("itinerariesNextCursor");
        if (nextCursor.length > 10) {
          await loadMoreData(nextCursor);
        }

        // if (!isFeaturedUpdating){
        // } 
      }
    };

    tabRef.current.addEventListener("scroll", handleScroll);
    // console.log(tabRef.current)
    return () => {
      if (tabRef.current) {
        // Remember to remove event listener when the component is unmounted
        tabRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMoreData]);
  return (
    <Screen className="flex flex-col  px-3 py-4 gap-6 md:gap-4 md:px-6 md:py-5 !rounded-none lg:px-20 !min-h-0 !h-screen overflow-hidden">
      <SubNavbar user={user} wrapperClassName="!gap-0" />
      <Wrapper className="md:justify-between md:items-center items-start">
        <Heading className="!text-[28px]">My itineraries</Heading>
        <Button
          onClick={() => {
            // navigate("/create-location");
            console.log("Create!");
          }}
          active
          className="md:!w-[280px] md:hover:opacity-70 md:!rounded-2xl flex justify-evenly gap-2 h-[60px] !rounded-full !fixed md:!static z-[4000] right-4 !w-fit  bottom-4 !bg-secondary-400 md:!bg-primary-400 md:!border-primary-400 border-secondary-400"
        >
          <Image
            imageClassName=""
            src={add}
            alt="add"
            className="w-[28px] h-[28px]"
          />
          <Heading className="md:block text-white hidden !text-[20px]">
            Create new itinerary
          </Heading>
        </Button>
      </Wrapper>
      {itineraries.length > 0 && 
        <Wrapper _ref={tabRef} col="true" className="md:gap-8 gap-6 overflow-y-scroll px-3 py-4">
        {itineraries.map((itinerary) => {
          return (<ItineraryCard key={itinerary._id}
          name={
            itinerary.name
          }
          numberOfLocations={itinerary.numOfLocations}
          // createdAt={itinerary.createdAt}
        />)
        })}
      
      </Wrapper>}
    </Screen>
  );
};

export default ItinerariesScreen;
